import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {BooleanList, EmployerInformation} from '../../models/app.models';

@Component({
  selector: 'app-intraedge-onboarding',
  templateUrl: './intraedge-onboarding.component.html',
  styleUrls: ['./intraedge-onboarding.component.scss']
})
export class IntraedgeOnboardingComponent implements OnInit {
  @Input() onboardingInfo: any;
  @Input() parentFormGroup: FormGroup;
  public employmentTypes = [
    {id: 1, name: 'W-2(Salaried)'},
    {id: 2, name: 'W-2(Hourly)'},
    {id: 3, name: 'C2C'},
    {id: 4, name: '1099'},
  ];
  public statesList = [];
  public offerstatusTypes = [
    {id: 1, value: 'Accepted'},
    {id: 2, value: 'Not Accepted'},
    {id: 3, value: 'Rejected'},
  ];
  public booleanList = BooleanList;
  public employerArray = [{}];
  public employerType$: any;

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    this.apiService.getStates().subscribe((res: any[]) => {
      this.statesList = res;
    });
    this.employerType$ = false;
  }

  onStatus(id) {
    const data = {
      subject: 'Offer Accepted by ' + this.onboardingInfo.personal.firstName + ' ' + this.onboardingInfo.personal.lastName +
        ' for ' + this.onboardingInfo.clientName,
      firstName: this.onboardingInfo.personal.firstName,
      lastName: this.onboardingInfo.personal.lastName,
      dob: this.onboardingInfo.personal.dob,
      ssn: this.onboardingInfo.personal.ssn,
      visa: this.onboardingInfo.personal.visa
    };
    if (id === 1) {
      this.apiService.sendEmail(data).subscribe(res => {
        console.log('res', res);
      });
    }
  }

  onEmployerType(value) {
    const isTrueCheck = [];
    this.onboardingInfo.internal.employer.forEach(res => {
      if (res.employerType === true) {
        isTrueCheck.push(true);
      }
    });
    if (isTrueCheck.includes(true)) {
      this.employerType$ = true;
    } else {
      this.employerType$ = false;
    }
  }

  onAddEmployer() {
    this.onboardingInfo.internal.employer.push(new EmployerInformation());
  }
}
