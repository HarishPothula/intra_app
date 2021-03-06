import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IntraedgeOnboardingComponent} from '../intraedge-onboarding/intraedge-onboarding.component';
import {ClientOnboardingComponent} from '../client-onboarding/client-onboarding.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ClientInformation, InteranalInformation, EmployerInformation} from '../../models/app.models';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  @Input() onboardingInfo: any;
  @Input() copyOfOnboardingInfo: any;
  public intraEdgeForm: FormGroup;
  public clientForm: FormGroup;
  @ViewChild(IntraedgeOnboardingComponent) intraedgeOnboardingComponent: IntraedgeOnboardingComponent;
  @ViewChild(ClientOnboardingComponent) clientOnboardingComponent: ClientOnboardingComponent;
  @Output() public onOnboardingsFormNext = new EventEmitter();
  public clientName: string;
  private record_id: any;

  constructor(private router: Router,
              private apiService: ApiService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.record_id = params['recordId'];
    });
    if (!this.record_id) {
      this.onboardingInfo = this.apiService.onboardingData;
      this.onboardingInfo.internal = new InteranalInformation();
      this.onboardingInfo.client = new ClientInformation();
      // this.onboardingInfo.internal.employer.push(new EmployerInformation());
    } else {
      this.onboardingInfo = this.onboardingInfo;
    }
    this.intraEdgeForm = new FormGroup({
      employmentType: new FormControl('', Validators.required),
      offerStatus: new FormControl('', Validators.required),
      employer: new FormGroup({
        companyName: new FormControl(''),
        name: new FormControl(''),
        ein: new FormControl(''),
        stateReg: new FormControl(''),
        phNo: new FormControl(''),
        email: new FormControl(''),
        address: new FormGroup({
          street: new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
          zip: new FormControl('')
        }),
        employerType: new FormControl('')
      }),
      bgvstartDate: new FormControl(''),
      bgvendDate: new FormControl(''),
      drugTeststartDate: new FormControl(''),
      drugTestendDate: new FormControl(''),
      ndastartDate: new FormControl(''),
      ndaendDate: new FormControl(''),
    });
    this.intraEdgeForm.get('employmentType').valueChanges.subscribe((empType) => {
      if (empType == 3) {
        this.intraEdgeForm.get(['employer', 'companyName']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'companyName']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'name']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'name']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'ein']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'ein']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'stateReg']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'stateReg']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'phNo']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'phNo']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'email']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'email']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'address', 'street']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'address', 'street']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'address', 'city']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'address', 'city']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'address', 'state']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'address', 'state']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'address', 'zip']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'address', 'zip']).updateValueAndValidity();
        this.intraEdgeForm.get(['employer', 'employer', 'employerType']).setValidators(Validators.required);
        this.intraEdgeForm.get(['employer', 'employer', 'employerType']).updateValueAndValidity();

      } else {
        this.intraEdgeForm.get(['employer', 'companyName']).clearValidators();
        this.intraEdgeForm.get(['employer', 'name']).clearValidators();
        this.intraEdgeForm.get(['employer', 'ein']).clearValidators();
        this.intraEdgeForm.get(['employer', 'stateReg']).clearValidators();
        this.intraEdgeForm.get(['employer', 'phNo']).clearValidators();
        this.intraEdgeForm.get(['employer', 'email']).clearValidators();
        this.intraEdgeForm.get(['employer', 'address', 'street']).clearValidators();
        this.intraEdgeForm.get(['employer', 'address', 'city']).clearValidators();
        this.intraEdgeForm.get(['employer', 'address', 'state']).clearValidators();
        this.intraEdgeForm.get(['employer', 'address', 'zip']).clearValidators();
        this.intraEdgeForm.get(['employer', 'employerType']).clearValidators();
      }
    });
    this.intraEdgeForm.get('offerStatus').valueChanges.subscribe((status) => {
      if (status == 1) {
        this.intraEdgeForm.get('bgvstartDate').setValidators(Validators.required);
        this.intraEdgeForm.get('bgvstartDate').updateValueAndValidity();
        this.intraEdgeForm.get('bgvendDate').setValidators(Validators.required);
        this.intraEdgeForm.get('bgvendDate').updateValueAndValidity();
        this.intraEdgeForm.get('drugTeststartDate').setValidators(Validators.required);
        this.intraEdgeForm.get('drugTeststartDate').updateValueAndValidity();
        this.intraEdgeForm.get('drugTestendDate').setValidators(Validators.required);
        this.intraEdgeForm.get('drugTestendDate').updateValueAndValidity();
        this.intraEdgeForm.get('ndastartDate').setValidators(Validators.required);
        this.intraEdgeForm.get('ndastartDate').updateValueAndValidity();
        this.intraEdgeForm.get('ndaendDate').setValidators(Validators.required);
        this.intraEdgeForm.get('ndaendDate').updateValueAndValidity();
      } else {
        this.intraEdgeForm.get('bgvstartDate').clearValidators();
        this.intraEdgeForm.get('bgvendDate').clearValidators();
        this.intraEdgeForm.get('drugTeststartDate').clearValidators();
        this.intraEdgeForm.get('drugTestendDate').clearValidators();
        this.intraEdgeForm.get('ndastartDate').clearValidators();
        this.intraEdgeForm.get('ndaendDate').clearValidators();
      }

    });
    this.clientForm = new FormGroup({
      ads: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      sow: new FormControl('', Validators.required),
      sowSubmittedOn: new FormControl(''),
      sowSubmittedBy: new FormControl(''),
      cafeNumber: new FormControl('', Validators.required),
      po: new FormControl('', Validators.required),
      poLineNumber: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl(''),
      laptopNo: new FormControl(''),
    });
    this.clientForm.get('sow').valueChanges.subscribe((res) => {
      if (res == 1 || res == 2) {
        this.clientForm.get('sowSubmittedOn').setValidators(Validators.required);
        this.clientForm.get('sowSubmittedOn').updateValueAndValidity();
        this.clientForm.get('sowSubmittedBy').setValidators(Validators.required);
        this.clientForm.get('sowSubmittedBy').updateValueAndValidity();
      } else {
        this.clientForm.get('sowSubmittedOn').clearValidators();
        this.clientForm.get('sowSubmittedBy').clearValidators();
      }

    });
  }

  onSubmit() {
    if (!this.record_id) {
      const uuid = UUID.UUID();
      this.onboardingInfo.recordId = uuid;
      this.onboardingInfo.personal.address = this.onboardingInfo.personal.address;
      console.log('info', this.onboardingInfo);
      this.apiService.postConsultantInfo(this.onboardingInfo).subscribe(res => {
        console.log(res);
      });
    } else {
      this.apiService.updateConsultantById(this.onboardingInfo, this.record_id).subscribe(res => {
        console.log(res);
      });
    }

    // this.router.navigateByUrl('/app/compliance');
  }

  onBack() {
    this.onOnboardingsFormNext.emit(true);
  }
}
