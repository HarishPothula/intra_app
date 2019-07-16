import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Onboardinginfo, PersonalInformation} from '../../models/app.models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  @Input() onboardingInfo: any;
  @Input() copyOfOnboardingInfo: any;
  @Output() public onPersonalFormNext = new EventEmitter();
  public initialForm: FormGroup;
  public personalForm: FormGroup;
  public statesList = [];
  public visaTypes = [
    {id: 1, type: 'Citizen'},
    {id: 2, type: 'GC'},
    {id: 3, type: 'H1B'},
    {id: 4, type: 'OPT'},
    {id: 5, type: 'CPT'},
    {id: 6, type: 'EAD'},
  ];
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
  public recordId: any;
  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.recordId = params['recordId'];
    });
    this.onboardingInfo = new Onboardinginfo();
    this.onboardingInfo.personal = new PersonalInformation();
    this.initialForm = new FormGroup({
      clientName: new FormControl('', Validators.required),
      accountManager: new FormControl('', Validators.required),
      recruiter: new FormControl('', Validators.required),
    });
    this.personalForm = new FormGroup({
      uuid: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      ssn: new FormControl('', Validators.required),
      phNo: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', Validators.required)
      }),
      visa: new FormControl('', Validators.required),
      expiration: new FormControl(''),
      i94date: new FormControl('')
    });
    if (this.personalForm.controls.visa.value) {
      this.personalForm.get('visa').valueChanges.subscribe((res) => {
        console.log(res);
        if (res != 1 && res != 2) {
          console.log('21', res);
          this.personalForm.get('expiration').setValidators(Validators.required);
          this.personalForm.get('expiration').updateValueAndValidity();
          this.personalForm.get('i94date').setValidators(Validators.required);
          this.personalForm.get('i94date').updateValueAndValidity();
        } else {
          this.personalForm.get('expiration').clearValidators();
          this.personalForm.get('i94date').clearValidators();
        }
      });
    }

    this.apiService.getStates().subscribe((res: any[]) => {
      this.statesList = res;
    });
  }

  onNext() {
    this.onPersonalFormNext.emit(true);
    this.apiService.onboardingData = this.onboardingInfo;
  }

}
