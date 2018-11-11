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
import { MenuComponent } from './menu/menu.component';
import { SecretRetrieveFormComponent } from './secret-retrieve-form/secret-retrieve-form.component';
import { FaqComponent } from './faq/faq.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CodeEntryComponent } from './code-entry/code-entry.component';
import { PricingComponent } from './pricing/pricing.component';
import { RecommendedUsageComponent } from './recommended-usage/recommended-usage.component';

const appRoutes: Routes = [
  //{ path: '',   redirectTo: '/app', pathMatch: 'full' },
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'store',
    component: SecretStoreFormComponent
  },
  {
    path: 'retrieve',
    component: SecretRetrieveFormComponent
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SecretStoreFormComponent,
    MenuComponent,
    SecretRetrieveFormComponent,
    FaqComponent,
    HeaderComponent,
    FooterComponent,
    CodeEntryComponent,
    PricingComponent,
    RecommendedUsageComponent
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
