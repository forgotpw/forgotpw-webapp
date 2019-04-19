import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';
import { timer, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-secret-retrieve-simple-form',
  templateUrl: './secret-retrieve-simple-form.component.html',
  styleUrls: ['./secret-retrieve-simple-form.component.css']
})
export class SecretRetrieveSimpleFormComponent implements OnInit {
  @ViewChild("passwordInput") passwordInput: ElementRef;
  arid: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  rawApplication: string = '';
  secret: string = '';
  countdownMax: number = 30;
  countdownValue: number = 30;
  disappearProgressValue: number = 100;
  showLoading: boolean = false;
  showdisappeared: boolean = false;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private route: ActivatedRoute) {
    this.arid = this.route.snapshot.queryParamMap.get('arid');
  }

  ngOnInit() {
    this.showLoading = true;
    this.passwordSecretsService.retrieveAuthorizedRequestSecret(this.arid).subscribe((secretData) => {
      // > this.secret = JSON.stringify(secretData);
      // > {"secret":"my secret","rawApplication":"testapp"}
      this.secret = secretData['secret'];
      this.rawApplication = secretData['rawApplication'];
      const animationTimer = timer(500);
      const subscribe = animationTimer.subscribe(() => {
        this.showLoading = false;

        const disappearPasswordInterval = interval(1000);
        const cancelIntervalTimer$ = timer((this.countdownMax + 1) * 1000);
        const example = disappearPasswordInterval.pipe(takeUntil(cancelIntervalTimer$));
        const subscribe = example.subscribe(val => {
          this.countdownValue--;
          this.disappearProgressValue = Math.round((this.countdownValue / this.countdownMax) * 100);
        });
        cancelIntervalTimer$.subscribe(() => {
          this.passwordInput.nativeElement.value = '';
          this.showdisappeared = true;
        })

      });

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

  onCopy() {
    // select all text in the input box
    this.passwordInput.nativeElement.select();
    // copy to clipboard
    document.execCommand("copy");
  }

}
