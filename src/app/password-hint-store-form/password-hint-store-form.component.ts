import { Component, OnInit } from '@angular/core';
import { PasswordHintStoreRequest } from '../password-hint-store-request';
import { PasswordSecretsService } from '../password-secrets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-hint-store-form',
  templateUrl: './password-hint-store-form.component.html',
  styleUrls: ['./password-hint-store-form.component.css'],
  providers: [PasswordSecretsService]
})
export class PasswordHintStoreFormComponent implements OnInit {
  model = new PasswordHintStoreRequest('', '', '');

  applicationFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20)
  ]);
  hintFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();

    this.model.application = this.applicationFormControl.value;
    this.model.phone = this.phoneFormControl.value;
    this.model.hint = this.hintFormControl.value;
    
    this.passwordSecretsService.storePasswordHint(this.model)
    .subscribe(() => {
      this.spinner.hide();
      this.model.application = '';
      this.model.phone = '';
      this.model.hint = '';
    })
  }

}
