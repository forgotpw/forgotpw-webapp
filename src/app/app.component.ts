import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedMode: any;
  modes: Array<any> = [
    {
      value:   'STORE',
      desc: 'Store a password hint'
    },
    {
      value:   'RETRIEVE',
      desc: 'Retrieve a password hint'
    }
  ];
}
