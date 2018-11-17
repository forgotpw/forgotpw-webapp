import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GeolocationService } from '../geolocation-service/geolocation.service';
import { SecretRetrieveRequest } from '../password-secrets-service/secret-retrieve-request';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-secret-retrieve-form',
  templateUrl: './secret-retrieve-form.component.html',
  styleUrls: ['./secret-retrieve-form.component.css']
})
export class SecretRetrieveFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<boolean>();
  @ViewChild("phoneInput") phoneInput: ElementRef;

  private retrieveForm: FormGroup;
  showSuccess: boolean = false;
  initiatedCountryLookup: boolean = false;
  countryCode: string = '';

  constructor(
    private geolocationService: GeolocationService,
    private passwordSecretsService: PasswordSecretsService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.showSuccess = false;

    this.getGeoLocation();

    this.retrieveForm = this.formBuilder.group({
      phone: [
        '', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20)
        ]
      ],
      application: [
        '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
    ]
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.phoneInput.nativeElement.focus();
    }, 10);
  }

  get f() { return this.retrieveForm.controls; }

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

  onSubmit(retrieveFormDirective: FormGroupDirective) {
    if (this.retrieveForm.invalid) {
      return;
    }

    let model = new SecretRetrieveRequest('', '');
    model.application = this.f.application.value;
    model.phone = this.f.phone.value;

    this.spinner.show();
    this.passwordSecretsService.retrieveSecret(model, this.countryCode)
    .subscribe(() => {
      this.spinner.hide();

      this.showSuccess = true;
      const successBannerTimer = timer(5000);
      const subscribe = successBannerTimer.subscribe(() => {
        retrieveFormDirective.reset();
        this.retrieveForm.reset();
        this.submitted.emit(true);
        this.router.navigate(['/']);
      });
    });
  }

  onCancel() {
    this.submitted.emit(false);
    this.router.navigate(['/']);
  }

}
