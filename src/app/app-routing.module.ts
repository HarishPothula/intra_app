import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {TimesheetsComponent} from './timesheets/timesheets.component';
import {OnboardingsComponent} from './onboardings/onboardings.component';
import {ComplianceComponent} from './compliance/compliance.component';
import {OffboardingComponent} from './offboarding/offboarding.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../services/auth.guard';
import {MainComponent} from './main/main.component';
import {OnboardingComponent} from './onboarding/onboarding.component';
import {PersonalComponent} from './personal/personal.component';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {
      path: 'app', component: MainComponent, children: [
        {path: 'admin', component: AdminComponent},
        // {path: 'admin/:record_id', component: AdminComponent},
        // {path: 'onboarding', component: OnboardingComponent},
        {path: 'timesheets', component: TimesheetsComponent},
        {path: 'onboardings', component: OnboardingsComponent},
        {path: 'compliance', component: ComplianceComponent},
        {path: 'offboarding', component: OffboardingComponent},
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
