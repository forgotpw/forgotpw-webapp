import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { PasswordHintStoreRequest } from '../password-hint-store-request';
import { PasswordSecretsService } from '../password-secrets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-hint-store-form',
  templateUrl: './password-hint-store-form.component.html',
  styleUrls: ['./password-hint-store-form.component.css'],
  providers: [PasswordSecretsService]
})
export class PasswordHintStoreFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<boolean>();
  private storeForm: FormGroup;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
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

  onSubmit(storeFormDirective: FormGroupDirective) {
    if (this.storeForm.invalid) {
      return;
    }
    this.spinner.show();

    let model = new PasswordHintStoreRequest('', '', '');
    model.application = this.f.application.value;
    model.phone = this.f.phone.value;
    model.hint = this.f.hint.value;

    this.passwordSecretsService.storePasswordHint(model)
    .subscribe(() => {
      this.spinner.hide();
      storeFormDirective.reset();
      this.storeForm.reset();
      this.submitted.emit(true);
    })
  }

  onCancel() {
    this.submitted.emit(false);
  }

}
