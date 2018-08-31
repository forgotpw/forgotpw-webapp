import { Component, OnInit } from '@angular/core';
import { PasswordHintStoreRequest } from '../password-hint-store-request';
import { PasswordSecretsService } from '../password-secrets.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-password-hint-store-form',
  templateUrl: './password-hint-store-form.component.html',
  styleUrls: ['./password-hint-store-form.component.css'],
  providers: [PasswordSecretsService]
})
export class PasswordHintStoreFormComponent implements OnInit {
  model = new PasswordHintStoreRequest('', '', '');

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.passwordSecretsService.storePasswordHint(this.model)
    .subscribe(() => {
      this.spinner.hide();
      this.model.application = '';
      this.model.phone = '';
      this.model.hint = '';
    })
  }

}
