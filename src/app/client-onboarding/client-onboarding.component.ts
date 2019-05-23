import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-client-onboarding',
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.scss']
})
export class ClientOnboardingComponent implements OnInit {
  @Input() onboardingInfo: any;
  @Input() parentFormGroup: FormGroup;
  public sowTypes = [
    {id: 1, type: 'Create New'},
    {id: 2, type: 'Ammend Existing'},
    {id: 3, type: 'Use Current SOW'},
  ];
  public sowSubmittersList = [
    {id: 1, name: 'Dinesh Palaria'},
    {id: 2, name: 'Raghu Marwaha'},
    {id: 3, name: 'Kumar Subramaniam'},
    {id: 4, name: 'Upendra B'},
    {id: 5, name: 'Amit Patra'},
    {id: 6, name: 'Smitha'},
    {id: 7, name: 'Girish'},
    {id: 8, name: 'Bhavana'},
    {id: 9, name: 'Priyanka'},
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
