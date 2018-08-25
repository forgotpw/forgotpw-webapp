import { Component, OnInit } from '@angular/core';
import { PasswordHintStoreRequest } from '../password-hint-store-request';

@Component({
  selector: 'app-password-hint-store-form',
  templateUrl: './password-hint-store-form.component.html',
  styleUrls: ['./password-hint-store-form.component.css']
})
export class PasswordHintStoreFormComponent implements OnInit {
  model = new PasswordHintStoreRequest('', '', '');

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

}
