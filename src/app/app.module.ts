import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PersonalComponent } from './personal/personal.component';
import { IntraedgeOnboardingComponent } from './intraedge-onboarding/intraedge-onboarding.component';
import { ClientOnboardingComponent } from './client-onboarding/client-onboarding.component';
import {CollapseModule} from 'ngx-bootstrap';
import {ArchwizardModule} from 'angular-archwizard';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import {PhoneMaskDirective} from '../shared/phoneNu-mask.directive';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { OnboardingsComponent } from './onboardings/onboardings.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { OffboardingComponent } from './offboarding/offboarding.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from '../services/authentication.service';
import {AuthGuard} from '../services/auth.guard';
import { MainComponent } from './main/main.component';
import {ExcelService} from '../services/excel.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PersonalComponent,
    IntraedgeOnboardingComponent,
    ClientOnboardingComponent,
    TimesheetsComponent,
    PhoneMaskDirective,
    OnboardingsComponent,
    ComplianceComponent,
    OffboardingComponent,
    OnboardingComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule,
    ArchwizardModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule,
  ],
  providers: [ApiService,
    AuthGuard,
    AuthenticationService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
