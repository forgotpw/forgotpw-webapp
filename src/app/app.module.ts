import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'

import { AppComponent } from './app.component';
import { PasswordHintStoreFormComponent } from './password-hint-store-form/password-hint-store-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordHintStoreFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
