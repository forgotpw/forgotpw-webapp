import { Component, OnInit } from '@angular/core';
import { PasswordHintStoreRequest } from '../password-hint-store-request';
import { PasswordSecretsService } from '../password-secrets.service';

@Component({
  selector: 'app-password-hint-store-form',
  templateUrl: './password-hint-store-form.component.html',
  styleUrls: ['./password-hint-store-form.component.css'],
  providers: [PasswordSecretsService]
})
export class PasswordHintStoreFormComponent implements OnInit {
  model = new PasswordHintStoreRequest('', '', '');
  working = false;

  constructor(private passwordSecretsService: PasswordSecretsService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.working = true;
    console.log('Starting request')
    this.passwordSecretsService.storePasswordHint(this.model)
    .subscribe(() => {
      console.log('Finished request')
      this.working = false;
    })
  }

}
