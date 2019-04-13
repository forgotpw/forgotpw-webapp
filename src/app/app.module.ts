import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SecretStoreFormComponent } from './secret-store-form/secret-store-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SecretRetrieveFormComponent } from './secret-retrieve-form/secret-retrieve-form.component';
import { HeaderComponent } from './header/header.component';
import { CodeEntryComponent } from './code-entry/code-entry.component';
import { RecommendedUsageComponent } from './recommended-usage/recommended-usage.component';
import { SecretStoreSimpleFormComponent } from './secret-store-simple-form/secret-store-simple-form.component';
import { SecretRetrieveSimpleFormComponent } from './secret-retrieve-simple-form/secret-retrieve-simple-form.component';

const appRoutes: Routes = [
  //{ path: '',   redirectTo: '/app', pathMatch: 'full' },
  // {
  //   path: '',
  //   component: MenuComponent
  // },
  {
    path: 'store',
    component: SecretStoreSimpleFormComponent
  },
  {
    path: 'retrieve',
    component: SecretRetrieveSimpleFormComponent
  },
  {
    path: 'store-full',
    component: SecretStoreFormComponent
  },
  {
    path: 'retrieve-full',
    component: SecretRetrieveFormComponent
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SecretStoreFormComponent,
    SecretRetrieveFormComponent,
    HeaderComponent,
    CodeEntryComponent,
    RecommendedUsageComponent,
    SecretStoreSimpleFormComponent,
    SecretRetrieveSimpleFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true }
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
