import { Component } from '@angular/core';
import { MdRadioChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modes: Array<any> = [
    {
      value: 'STORE',
      desc:  'Store a password hint'
    },
    {
      value: 'RETRIEVE',
      desc:  'Retrieve a password hint'
    }
  ];
  selectedMode: string = this.modes[0].value;

  radioChange(event: MdRadioChange) {
    //console.log(event.value);
  }

}
