import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {
  public candidateForm: FormGroup;
  public initialForm: FormGroup;
  public clientsList = [{id: 1, name: 'American Express'}];
  public accountManagersList = [
    {id: 1, name: 'Dinesh Palaria'},
    {id: 2, name: 'Raghu Marwaha'},
    {id: 3, name: 'Kumar Subramaniam'},
    {id: 4, name: 'Upendra B'},
  ];
  public recruitersList = [
    {id: 1, name: 'Amit Patra'},
    {id: 2, name: 'Smitha'},
    {id: 3, name: 'Girish'},
    {id: 4, name: 'Bhavana'},
    {id: 4, name: 'Priyanka'},
  ];
  constructor() {
  }

  ngOnInit() {
    this.initialForm = new FormGroup({
      clientName: new FormControl(null, Validators.required),
      accountManager: new FormControl(null, Validators.required),
      recruiter: new FormControl(null, Validators.required),
    });
    this.candidateForm = new FormGroup({
      resourceId: new FormControl('', Validators.required),
      resourceFirstName: new FormControl('', Validators.required),
      resourceMiddleName: new FormControl(''),
      resourceLastName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      leaderLevel3: new FormControl('', Validators.required),
      leaderLevel5: new FormControl('', Validators.required),
      leaderLevel6: new FormControl('', Validators.required),
      normalizedVendor: new FormControl('', Validators.required),
      resourceClassification: new FormControl('', Validators.required),
      employeeOrSubCon: new FormControl('', Validators.required),
      subContractorCompany: new FormControl('', Validators.required),
      resourceStatus: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      notificationdateResourceLeaving: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      definedAsKeyPersonnel: new FormControl('', Validators.required),
      definedAsCriticalresource: new FormControl('', Validators.required),
      onShoreOffShore: new FormControl(''),
      onSiteOffSite: new FormControl(''),
      projectId: new FormControl(''),
      role: new FormControl('', Validators.required),
      premiumTechnology: new FormControl(''),
      poNumber: new FormControl('', Validators.required),
      adsId: new FormControl(''),
      laptopNo: new FormControl('', Validators.required),
      visaStatus: new FormControl('', Validators.required),
      visaexpiration: new FormControl('', Validators.required),
      bgvCompletionEndDate: new FormControl('', Validators.required),
      commodity: new FormControl(''),
      newResourceExpectedRate: new FormControl(''),
      assignmentPeriod: new FormControl(''),
      resouceRateException: new FormControl(''),
      commentary: new FormControl(''),
      misc: new FormControl(''),
    });
  }

  onSubmit(value1, value2) {
    const finalValue = Object.assign(value1, value2);
    console.log(finalValue);
  }

}
