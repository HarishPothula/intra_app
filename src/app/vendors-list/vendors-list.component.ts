import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {
  public vendorsList: any;

  constructor(private apiService: ApiService,
              private router: Router,
              private excel: ExcelService) {
  }

  ngOnInit() {
    this.getVendors();
  }

  getVendors() {
    this.apiService.getVendorInfo().subscribe(res => {
      this.vendorsList = res;
    });
  }

  onDelete(row) {
    this.apiService.deleteVendorRecord(row.record_id).subscribe(res => {
      this.getVendors();
    });
  }

  onEdit(row) {
    this.router.navigate(['/app/vendors'], {queryParams: {recordId: row.record_id}});
  }

  onDownload() {
    const parsedVendorList = [];
    this.vendorsList.forEach(res => {
      const parsedVendor = {
        'Vendor Name': res.vendorName,
        'Contact Person': res.contactPerson,
        Contact: res.contact,
        'e-mail': res.email,
        Address: res.street + ',' + res.city + ',' + res.state + ',' + res.zip,
      };
      parsedVendorList.push(parsedVendor);
    });
    this.excel.exportAsExcelFile(parsedVendorList, 'List Of Vendors');
  }
}




