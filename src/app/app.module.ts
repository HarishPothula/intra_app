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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { VendorComponent } from './vendor/vendor.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import {ConsultantListComponent} from './consultant-list/consultant-list.component';
import {CSV2JSONModule} from 'angular2-csv2json';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import { AuditModalComponent } from './audit-modal/audit-modal.component';
import {ModalModule} from 'ngb-modal';
import { ShowModalComponent } from './show-modal/show-modal.component';

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
    MainComponent,
    VendorComponent,
    ConsultantComponent,
    VendorsListComponent,
    ConsultantListComponent,
    AuditModalComponent,
    ShowModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    NgSelectModule,
    CSV2JSONModule,
    BootstrapModalModule,
    ModalModule
  ],
  providers: [ApiService,
    AuthGuard,
    AuthenticationService,
    ExcelService
  ],
  exports: [AuditModalComponent],
  entryComponents: [
    AuditModalComponent,
    ShowModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
