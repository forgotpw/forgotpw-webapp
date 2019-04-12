import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GeolocationService } from '../geolocation-service/geolocation.service';
import { SecretStoreRequest, SecretStoreAridRequest } from '../password-secrets-service/secret-store-request';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';
import { CodesService } from '../codes-service/codes.service'
import { CodeGenerateRequest } from '../codes-service/code-generate-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { CodeEntryComponent } from '../code-entry/code-entry.component'
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-secret-store-form',
  templateUrl: './secret-store-form.component.html',
  styleUrls: ['./secret-store-form.component.css'],
  //encapsulation: ViewEncapsulation.None,
  providers: [PasswordSecretsService, CodesService]
})
export class SecretStoreFormComponent implements OnInit, AfterViewInit {
  @Output() submitted = new EventEmitter<boolean>();
  @ViewChild("codeEntry") codeEntry: CodeEntryComponent;
  @ViewChild("phoneInput") phoneInput: ElementRef;
  private storeForm: FormGroup;
  showSuccess: boolean = false;
  showCodeEntry: boolean = false;
  showCodeLoading: boolean = false;
  showInvalidCode: boolean = false;
  showError: boolean = false;
  showTips: boolean = false;
  errorMessage: string = '';
  hideTyping: boolean = false;
  initiatedCountryLookup: boolean = false;
  countryCode: string = '';
  isAridMode: boolean = false;
  arid: string = '';

  constructor(
    private geolocationService: GeolocationService,
    private passwordSecretsService: PasswordSecretsService,
    private codesService: CodesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      this.arid = this.route.snapshot.queryParamMap.get('arid');
      this.isAridMode = this.arid ? true : false;
    }

  ngOnInit() {
    this.showSuccess = false;

    this.getGeoLocation();

    let formComponents = {};

    // when in arid mode the secret is the only field needed since we already know
    // the phone number and application from the chat session, otherwise we need
    // to add form controls for those fields
    if (!this.isAridMode) {
      formComponents['phone'] = [
            '', [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(20)
            ]
          ];
      formComponents['application'] = [
            '', [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
           ]
         ];
    }

    formComponents['secret'] = [
          '', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ];

    this.storeForm = this.formBuilder.group(formComponents);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.phoneInput.nativeElement.focus();
    }, 10);
  }
  
  get f() { return this.storeForm.controls; }

  onSubmit() {
    let codeRequest = new CodeGenerateRequest(this.f.phone.value)
    this.showCodeLoading = true;
    this.storeForm.disable();
    this.codesService.requestCode(codeRequest)
    .subscribe(() => {
      // since it takes a second or so to receive the text anyway
      // let's keep the spinner animation going for a bit longer
      const animationTimer = timer(750);
      const subscribe = animationTimer.subscribe(() => {
        this.showCodeLoading = false;
        this.showCodeEntry = true;
        });
    })
  }

  onRequestNewCode() {
    this.showInvalidCode = false;
    let codeRequest = new CodeGenerateRequest(
      this.f.phone.value
    )
    this.showCodeLoading = true;
    this.codeEntry.reset();
    this.showCodeEntry = false;
    this.codesService.requestCode(codeRequest)
    .subscribe(() => {
      this.showCodeLoading = false;
      this.showCodeEntry = true;
    })
  }

  onCodeEntered(codeEntered: string) {
    this.submitForm(codeEntered);
  }

  onHideTypingChange($event){
    this.hideTyping = $event.checked; 
  }

  getGeoLocation() {
    // only do this once
    if (!this.initiatedCountryLookup) {
      this.initiatedCountryLookup = true;

      // kick off the country code lookup here so the user doesn't
      // have to wait for it when hitting submit
      let countryCode = this.geolocationService.getCountryCode()
      .subscribe(res => {
        console.debug(`Geolocation API response: ${res}`);
        this.countryCode = res;
      })
    }
  }

  submitForm(verificationCode) {
    if (this.storeForm.invalid) {
      return;
    }

    if (this.isAridMode) {
      this.submitAridForm();
    } else {
      this.submitVerificationFlowForm(verificationCode);
    }
  }

  submitVerificationFlowForm(verificationCode) {
    let model = new SecretStoreRequest(
      this.f.application.value,
      this.f.secret.value,
      this.f.phone.value);

    this.passwordSecretsService.storeSecret(model, verificationCode, this.countryCode)
    .subscribe(res => {

      this.showSuccess = true;
      this.fireAdwordsConversion();
      const successBannerTimer = timer(3000);
      const subscribe = successBannerTimer.subscribe(() => {
        this.storeForm.reset();
        this.submitted.emit(true);
        //this.router.navigate(['/']);
        window.location.href = 'https://www.forgotpw.com';
      });
    },
    err => {
      console.log(err);
      if (err.status && err.status == 401) {
        this.showInvalidCode = true;
      } else {
        this.showError = true;
        this.errorMessage = err.message;
      }
      this.codeEntry.reset();

    });
  }

  submitAridForm() {
    if (this.storeForm.invalid) {
      return;
    }

    let model = new SecretStoreAridRequest(this.f.secret.value);

    this.passwordSecretsService.storeSecretViaArid(this.arid, this.f.secret.value)
    .subscribe(res => {

      this.showSuccess = true;
      this.fireAdwordsConversion();
      const successBannerTimer = timer(3000);
      const subscribe = successBannerTimer.subscribe(() => {
        this.storeForm.reset();
        this.submitted.emit(true);
        //this.router.navigate(['/']);
        window.location.href = 'https://www.forgotpw.com';
      });
    },
    err => {
      console.log(err);
      if (err.status && err.status == 401) {
        this.showInvalidCode = true;
      } else {
        this.showError = true;
        this.errorMessage = err.message;
      }
    });
  }

  fireAdwordsConversion() {
    console.log('Firing adwords conversion...');
    (<any>window).gtag('event', 'conversion', {'send_to': 'AW-758048748/wt4sCJeIvZYBEOzPu-kC'});
  }

  onCancel() {
    this.submitted.emit(false);
    //this.router.navigate(['/']);
    window.location.href = 'https://www.forgotpw.com';
  }

  onClickTips() {
    this.showTips = true;
  }

  onCloseTips() {
    this.showTips = false;
  }

}
