import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MdRadioChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // modes: Array<any> = [
  //   {
  //     value: 'STORE',
  //     desc:  'Store a password hint'
  //   },
  //   {
  //     value: 'RETRIEVE',
  //     desc:  'Retrieve a password hint'
  //   }
  // ];
  // selectedMode: string = this.modes[0].value;
  // radioChange(event: MdRadioChange) {
  //   //console.log(event.value);
  // }
  selectedMode: string;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url == '/') {
      this.selectedMode = 'MENU';
    }
  }
}
