import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Onboardinginfo} from '../../models/app.models';
import {ExcelService} from '../../services/excel.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public onboardingInfo: {};
  public next: boolean;
  public back: boolean;
  public dataToBeExported = [
    {Fname: 'Harish', LName: 'Pothula'},
    {Fname: 'Harish', LName: 'Pothula'},
    {Fname: 'Harish', LName: 'Pothula'},
    {Fname: 'Harish', LName: 'Pothula'}
  ];
  private record_id: any;
  private data: any;
  text: any;
  JSONData: any;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  public categeory = [
    {id: 1, cat: 'Category 1'},
    {id: 2, cat: 'Category 2'},
    {id: 3, cat: 'Category 3'},
    {id: 4, cat: 'Category 4'},
  ];
  public copyOfOnboardingInfo: any;

  constructor(private excel: ExcelService,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService) {
    this.onboardingInfo = new Onboardinginfo();
  }

  ngOnInit() {
    this.next = false;
    this.activatedRoute.queryParams.subscribe(params => {
      this.record_id = params['recordId'];
    });
    if (this.record_id) {
      this.apiService.getResourceInfoById(this.record_id).subscribe((res: any) => {
        this.onboardingInfo = JSON.parse(res[0].resp_data);
        console.log(this.onboardingInfo);
        this.copyOfOnboardingInfo = JSON.parse(JSON.stringify(this.onboardingInfo));
      });
    } else {
      this.onboardingInfo = new Onboardinginfo();
      this.copyOfOnboardingInfo = {...this.onboardingInfo};
    }
  }

  getNextEvent($event) {
    this.next = $event;
    if (this.next === true) {
      this.back = false;
    }
  }

  getOnBackEvent($event) {
    this.back = $event;
    if (this.back === true) {
      this.next = false;
    }
  }

  csvJSON(csvText) {
   /* const lines = csvText.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    console.log(headers);
    for (let i = 1; i < lines.length - 1; i++) {
      const obj = {};
      const currentline = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    console.log(JSON.stringify(result));
    this.JSONData = JSON.stringify(result);
    result.forEach(res => {
      const obj = {
        resourceId: res['Resource ID'],
        resourceFirstName: res['Resource First Name'],
        resourceMiddleName: res['Resource Middle Name'],
        resourceLastName: res['Resource Last Name'],
        location: res['Location Description'],
        locationaddress: res['Location Address 1'],
        city: res['Location City'],
        state: res['Location State'],
        country: res['Location Country'],
        leaderLevel3: res['Leader Level 3'],
        leaderLevel4: res['Leader Level 4'],
        leaderLevel5: res['Leader Level 5'],
        leaderLevel6: res['Leader Level 6'],
        normalizedVendor: res['Normalized Vendor'],
        resourceClassification: res['Resource Classification'],
        employeeOrSubCon: res['Employee/Sub-Contractor'],
        subContractorCompany: res['Sub-Contractor Company Name'],
        resourceStatus: res['Resource Status'],
        startDate: res['Start Date'],
        notificationdateResourceLeaving: res['Notification Date Resource Leaving'],
        departureDate: res['Departure Date'],
        definedAsKeyPersonnel: res['Defined as Key Personnel'],
        definedAsCriticalresource: res['Defined as Critical Resource'],
        onShoreOffShore: res['Non T&M (On-Shore or Off-Shore)'],
        onSiteOffSite: res['Non T&M (On-Site or Off-Site)'],
        projectId: res['Project ID'],
        role: res['Role Title/Job Description'],
        premiumTechnology: res['Premium Technology/Skillset (if applicable)'],
        poNumber: res['PO/SOW Number'],
        adsId: res['ADS ID'],
        laptopNo: res['AMEX Laptop / Desktop Asset Number '],
        visaStatus: res['Resource Visa Status '],
        visaexpiration: res['Visa Expiration Date'],
        bgvCompletionEndDate: res['Background Completion End Date'],
        commodity: res['Commodity'],
        newResourceExpectedRate: res['New Resource Expected Rate'],
        assignmentPeriod: res['New Resource Assignment period (e.g.: 3 months) '],
        resouceRateException: res['New Resource Rate Exception'],
        commentary: res['Commentary'],
        misc: res['Misc.'],
      };
      console.log('object', obj);
      // this.apiService.postResourceInfo(obj).subscribe(resp => {
      //   console.log(resp);
      // });
    });*/

  }

  convertFile(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0].name;
      const updatedDate = input.files[0].lastModifiedDate;
      console.log('file', file);
      console.log('updatedDate', updatedDate);
      // if (file === 'IntraEdge New Compliance Resource Report_Example.csv') {
      const reader = new FileReader();

      reader.readAsText(input.files[0]);
      reader.onload = () => {
        const text = reader.result;
        this.text = text;
        this.csvJSON(text);
      };
    }
  }

}
