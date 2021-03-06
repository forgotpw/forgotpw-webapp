import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from './header/header.component';
import { CodeEntryComponent } from './code-entry/code-entry.component';
import { RecommendedUsageComponent } from './recommended-usage/recommended-usage.component';
import { SecretStoreFormComponent } from './secret-store-form/secret-store-form.component';
import { SecretRetrieveFormComponent } from './secret-retrieve-form/secret-retrieve-form.component';

const appRoutes: Routes = [
  //{ path: '',   redirectTo: '/app', pathMatch: 'full' },
  // {
  //   path: '',
  //   component: MenuComponent
  // },
  {
    path: 'set',
    component: SecretStoreFormComponent
  },
  {
    path: 'get',
    component: SecretRetrieveFormComponent
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CodeEntryComponent,
    RecommendedUsageComponent,
    SecretStoreFormComponent,
    SecretRetrieveFormComponent
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
