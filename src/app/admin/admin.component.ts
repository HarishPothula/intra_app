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
      this.apiService.getConsultantsInfoById(this.record_id).subscribe((res: any) => {
        this.onboardingInfo = JSON.parse(res[0].data);
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
    const lines = csvText.split('\n');
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

  onExport() {
    this.excel.exportAsExcelFile(this.dataToBeExported, 'ExportedFromAngularAPP');
  }
}
