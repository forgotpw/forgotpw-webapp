import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  private retrieveForm: FormGroup;
  showSuccess: boolean = false;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.showSuccess = false;

    this.retrieveForm = this.formBuilder.group({
      application: [
          '', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
      ],
      phone: [
        '', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  get f() { return this.retrieveForm.controls; }

  onSubmit(retrieveFormDirective: FormGroupDirective) {
    if (this.retrieveForm.invalid) {
      return;
    }

    let model = new SecretRetrieveRequest('', '');
    model.application = this.f.application.value;
    model.phone = this.f.phone.value;

    this.spinner.show();
    this.passwordSecretsService.retrieveSecret(model)
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
