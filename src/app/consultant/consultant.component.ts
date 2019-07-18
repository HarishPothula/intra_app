import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {
  @Input() onboardingInfo: any;
  @Input() copyOfOnboardingInfo: any;
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
  public record_id: any;
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.record_id = params['recordId'];
    });
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
      location: new FormControl(''),
      locationaddress: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      leaderLevel3: new FormControl(''),
      leaderLevel4: new FormControl(''),
      leaderLevel5: new FormControl(''),
      leaderLevel6: new FormControl(''),
      normalizedVendor: new FormControl(''),
      resourceClassification: new FormControl(''),
      employeeOrSubCon: new FormControl(''),
      subContractorCompany: new FormControl(''),
      resourceStatus: new FormControl(''),
      startDate: new FormControl(''),
      notificationdateResourceLeaving: new FormControl(''),
      departureDate: new FormControl(''),
      definedAsKeyPersonnel: new FormControl(''),
      definedAsCriticalresource: new FormControl(''),
      onShoreOffShore: new FormControl(''),
      onSiteOffSite: new FormControl(''),
      projectId: new FormControl(''),
      role: new FormControl(''),
      premiumTechnology: new FormControl(''),
      poNumber: new FormControl(''),
      adsId: new FormControl(''),
      laptopNo: new FormControl(''),
      visaStatus: new FormControl(''),
      visaexpiration: new FormControl(''),
      bgvCompletionEndDate: new FormControl(''),
      commodity: new FormControl(''),
      newResourceExpectedRate: new FormControl(''),
      assignmentPeriod: new FormControl(''),
      resouceRateException: new FormControl(''),
      commentary: new FormControl(''),
      misc: new FormControl(''),
    });
  }

  onSubmit(value1, value2) {
    this.apiService.updateResourceById(this.candidateForm.value, this.candidateForm.value.resourceId).subscribe(resp => {
      console.log(resp);
    });
  }

}
