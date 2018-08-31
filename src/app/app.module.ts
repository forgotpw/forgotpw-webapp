import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PasswordHintStoreFormComponent } from './password-hint-store-form/password-hint-store-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
 
@NgModule({
  declarations: [
    AppComponent,
    PasswordHintStoreFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
