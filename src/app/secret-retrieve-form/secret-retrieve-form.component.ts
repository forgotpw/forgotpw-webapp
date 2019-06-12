import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PasswordSecretsService } from '../password-secrets-service/password-secrets.service';
import { timer, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-secret-retrieve-form',
  templateUrl: './secret-retrieve-form.component.html',
  styleUrls: ['./secret-retrieve-form.component.css']
})
export class SecretRetrieveFormComponent implements OnInit {
  @ViewChild("passwordInput") passwordInput: ElementRef;
  arid: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  rawApplication: string = '';
  secret: string = '';
  countdownMax: number;
  countdownValue: number;
  disappearProgressValue: number;
  showLoading: boolean = false;
  showdisappeared: boolean = false;
  retrieveSecretSubscription: Subscription;

  constructor(
    private passwordSecretsService: PasswordSecretsService,
    private router: Router,
    private route: ActivatedRoute) {
      router.events.subscribe((val) => {
        // if the url is changed, be sure to reset the form to start over with the new value
        if (val instanceof NavigationEnd) {
          console.log('Route changed, resetting...')
          this.retrieveSecretSubscription.unsubscribe();
          this.ngOnInit();
        }
      });  
  }

  ngOnInit() {
    this.showLoading = true;
    this.showError = false;
    this.errorMessage = '';
    this.rawApplication = '';
    this.secret = '';
    this.countdownMax = 30;
    this.countdownValue = 30;
    this.disappearProgressValue = 100;
    this.showdisappeared = false;
    this.arid = this.route.snapshot.queryParamMap.get('arid');

    // if the last character of the arid is a period, remove it, which might be
    // the case from the way the SMS text is built to suppress the live preview
    // functionality on iOS
    let lastChar = this.arid[this.arid.length - 1];
    if (lastChar == '.') {
      this.arid = this.arid.substr(0, this.arid.length-1);
    }


    this.retrieveSecretSubscription = this.passwordSecretsService.retrieveAuthorizedRequestSecret(this.arid).subscribe((secretData) => {
      // > this.secret = JSON.stringify(secretData);
      // > {"secret":"my secret","rawApplication":"testapp"}
      this.secret = secretData['secret'];
      this.rawApplication = secretData['rawApplication'];
      const animationTimer = timer(250);
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
        this.errorMessage = 'This request is expired (Please re-issue your request via chat to get a new link).'
      } else {
        this.errorMessage = `Err: ${err.status}: ${err.message}`; // JSON.stringify(err);
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
