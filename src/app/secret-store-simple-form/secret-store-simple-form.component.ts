import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SecretStoreAridRequest } from '../password-secrets-service/secret-store-request';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-secret-store-simple-form',
  templateUrl: './secret-store-simple-form.component.html',
  styleUrls: ['./secret-store-simple-form.component.css'],
  providers: [PasswordSecretsService]
})
export class SecretStoreSimpleFormComponent implements OnInit, AfterViewInit {
  @Output() submitted = new EventEmitter<boolean>();
  @ViewChild("secretInput") secretInput: ElementRef;
  private storeForm: FormGroup;
  showSuccess: boolean = false;
  showError: boolean = false;
  showTips: boolean = false;
  errorMessage: string = '';
  hideTyping: boolean = false;
  arid: string = '';
  isFirstTime: boolean = false;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      router.events.subscribe((val) => {
        // if the url is changed, be sure to reset the form to start over with the new value
        if (val instanceof NavigationEnd) {
          console.log('Route changed, resetting...')
          this.ngOnInit();
          this.ngAfterViewInit();
        }
      });
    }

  ngOnInit() {
    this.showSuccess = false;
    this.showError = false;
    this.showTips = false;
    this.errorMessage = '';
    this.hideTyping = false;
    this.arid = this.route.snapshot.queryParamMap.get('arid');

    let formComponents = {};
    formComponents['secret'] = [
          '', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ];

    this.storeForm = this.formBuilder.group(formComponents);

    this.passwordSecretsService.retrieveAuthorizedRequest(this.arid).subscribe((aridData) => {
      this.isFirstTime = aridData['isFirstTime'];
      if (this.isFirstTime) {
        this.showTips = true;
      }
    },
    err => {
      this.showError = true;
      if (err.status == 403 || err.status == 404) {
        this.errorMessage = 'This request is expired (Please re-issue your request via chat to get a new link).'
      } else {
        this.errorMessage = err.message; // JSON.stringify(err);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.secretInput.nativeElement.focus();
    }, 10);
  }
  
  get f() { return this.storeForm.controls; }

  onHideTypingChange($event){
    this.hideTyping = $event.checked; 
  }

  onSubmit() {
    if (this.storeForm.invalid) {
      return;
    }
    let model = new SecretStoreAridRequest(this.f.secret.value);

    this.passwordSecretsService.storeSecretViaArid(this.arid, this.f.secret.value)
    .subscribe(res => {

      this.showSuccess = true;
      this.fireAdwordsConversion();

      // const successBannerTimer = timer(3000);
      // const subscribe = successBannerTimer.subscribe(() => {
      //   this.storeForm.reset();
      //   this.submitted.emit(true);
      //   // produces the error "Scripts may close only the windows that were opened by it."
      //   // window.close();
      // });
    },
    err => {
      console.log(err);
      this.showError = true;
      if (err.status && err.status == 403) {
        this.errorMessage = `Authorized request ${this.arid} has expired.`;
      } else if (err.status && err.status == 404) {
        this.errorMessage = `Authorized request ${this.arid} has expired or is not found.`;
      } else {
        this.errorMessage = `Error ${err.status}: ${err.message}`;
      }
    });
  }

  fireAdwordsConversion() {
    console.log('Firing adwords conversion...');
    (<any>window).gtag('event', 'conversion', {'send_to': 'AW-758048748/wt4sCJeIvZYBEOzPu-kC'});
  }

  onClickTips() {
    this.showTips = true;
  }

  onCloseTips() {
    this.showTips = false;
  }

}
