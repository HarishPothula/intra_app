import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {BooleanList, Vendor} from '../../models/app.models';
import {ExcelService} from '../../services/excel.service';
import csc from 'country-state-city';
import {UUID} from 'angular2-uuid';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  public vendorForm: FormGroup;
  public statesList = [];
  public booleanList = BooleanList;
  public vendorInfo: any;
  public countriesList: any;
  private userName: string;
  private recordId: any;

  constructor(private apiService: ApiService,
              private excel: ExcelService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.recordId = params['recordId'];
    });
    if (this.recordId) {
      this.apiService.getVendorById(this.recordId).subscribe(res => {
        this.vendorInfo = res[0];
      });
    }
    this.vendorInfo = new Vendor();
    this.vendorForm = new FormGroup({
      vendorName: new FormControl('', Validators.required),
      contactPerson: new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{9}$/)]),
      email: new FormControl('', [Validators.required]),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      scopeOfServices: new FormControl('', Validators.required),
      newSubmittal: new FormControl('', Validators.required)
    });
    this.countriesList = csc.getAllCountries();
    this.userName = sessionStorage.getItem('LoggedInUser');
  }

  onSubmit(vendorInfo) {
    if (!this.recordId) {
      const uuid = UUID.UUID();
      vendorInfo.record_id = uuid;
      vendorInfo.createdBy = 'Admin';
      vendorInfo.createdOn = moment().format();
      console.log(vendorInfo);
      this.apiService.postVendorInfo(vendorInfo).subscribe(res => {
        console.log(res);
      });
    } else if (this.recordId) {
      vendorInfo.updatedBy = 'Admin';
      vendorInfo.updatedOn = moment().format();
      this.apiService.postVendorInfo(vendorInfo).subscribe(res => {
        console.log(res);
      });
    }
  }

  onDownload() {
    this.apiService.getVendorInfo().subscribe(res => {
      this.excel.exportAsExcelFile(res, 'vendors');
    });
  }

  onCountry(event) {
    if (this.vendorInfo) {
      this.vendorInfo.address = [];
    }
    this.statesList = csc.getStatesOfCountry(event.id);
  }
}

