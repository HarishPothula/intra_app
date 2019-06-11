import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {
  public candidateForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
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

  onSubmit(info) {
    console.log(info);
  }

}
