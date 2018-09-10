import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // onStoreSubmitted(submitted: boolean) {
  //   if (submitted) {
  //     this.selectedMode = 'SUCCESS_STORE';
  //     const successBannerTimer = timer(3000);
  //     const subscribe = successBannerTimer.subscribe(() =>
  //       this.selectedMode = 'MENU')
  //   } else {
  //     this.selectedMode = 'MENU';
  //   }
  // }

}
