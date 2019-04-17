import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';

@Component({
  selector: 'app-secret-retrieve-simple-form',
  templateUrl: './secret-retrieve-simple-form.component.html',
  styleUrls: ['./secret-retrieve-simple-form.component.css']
})
export class SecretRetrieveSimpleFormComponent implements OnInit {
  arid: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  rawApplication: string = '';
  secret: string = '';
  countdownValue: number = 5;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private route: ActivatedRoute) {
    this.arid = this.route.snapshot.queryParamMap.get('arid');
  }

  ngOnInit() {
    this.passwordSecretsService.retrieveAuthorizedRequestSecret(this.arid).subscribe((secretData) => {
      // > this.secret = JSON.stringify(secretData);
      // > {"secret":"my secret","rawApplication":"testapp"}
      this.secret = secretData['secret'];
      this.rawApplication = secretData['rawApplication'];
    },
    err => {
      this.showError = true;
      if (err.status == 403 || err.status == 404) {
        this.errorMessage = 'This request is expired.'
      } else {
        this.errorMessage = err.message; // JSON.stringify(err);
      }
    });

  }

}
