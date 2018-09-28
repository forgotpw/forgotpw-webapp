import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PasswordHintStoreRequest } from '../password-secrets-service/password-hint-store-request';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';
import { CodesService } from '../codes-service/codes.service'
import { CodeGenerateRequest } from '../codes-service/code-generate-request';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-password-hint-store-form',
  templateUrl: './password-hint-store-form.component.html',
  styleUrls: ['./password-hint-store-form.component.css'],
  providers: [PasswordSecretsService, CodesService]
})
export class PasswordHintStoreFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<boolean>();
  private storeForm: FormGroup;
  private showSuccess: boolean = false;
  private showCodeEntry: boolean = false;
  private showCodeLoading: boolean = false;
  private showInvalidCode: boolean = false;
  private showError: boolean = false;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private codesService: CodesService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.showSuccess = false;

    this.storeForm = this.formBuilder.group({
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
      ],
      hint: [
        '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  get f() { return this.storeForm.controls; }

  onSubmit() {
    let codeRequest = new CodeGenerateRequest(
      this.f.application.value,
      this.f.phone.value
    )
    this.showCodeLoading = true;
    this.storeForm.disable();
    this.codesService.requestCode(codeRequest)
    .subscribe(() => {
      this.showCodeLoading = false;
      this.showCodeEntry = true;
    })
  }

  onCodeEntered(codeEntered: string) {
    this.submitForm(codeEntered);
  }

  submitForm(code) {
    if (this.storeForm.invalid) {
      return;
    }

    let model = new PasswordHintStoreRequest(
      this.f.application.value,
      this.f.hint.value,
      this.f.phone.value,
      code);

    this.spinner.show();
    this.passwordSecretsService.storePasswordHint(model)
    .subscribe(res => {
      this.spinner.hide();

      this.showSuccess = true;
      const successBannerTimer = timer(3000);
      const subscribe = successBannerTimer.subscribe(() => {
        this.storeForm.reset();
        this.submitted.emit(true);
        this.router.navigate(['/']);
      });
    },
    err => {
      this.spinner.hide();
      console.log(err);
      if (err.status && err.status == 401) {
        this.showInvalidCode = true;
      } else {
        this.showError = true;
      }

    });
  }

  onCancel() {
    this.submitted.emit(false);
    this.router.navigate(['/']);
  }

}
