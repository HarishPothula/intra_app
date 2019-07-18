import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {ExcelService} from '../../services/excel.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {
  public vendorsList: any;
  public loading: boolean;

  constructor(private apiService: ApiService,
              private router: Router,
              private excel: ExcelService) {
  }

  ngOnInit() {
    this.getVendors();
    this.loading = false;
  }

  getVendors() {
    this.apiService.getVendorInfo().subscribe(res => {
      this.vendorsList = res;
    }, (error) => {
      console.log(error);
    }, () => {
      this.loading = false;
    });
  }

  onDelete(row) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteVendorRecord(row.vendorName).subscribe(res => {
          swal.fire(
            'Deleted!',
            'Your Record has been deleted.',
            'success'
          );
          this.getVendors();
        });
      }
    });
  }

  onEdit(row) {
    this.router.navigate(['/app/vendors'], {queryParams: {recordId: row.vendorName}});
  }

  onUpload(event: { type: string, data: any }) {
    this.loading = true;
    if (event.type === 'success') {
      console.log(event.data);
      event.data.forEach(res => {
        const obj = {
          vendorName: res['ï»¿Vendor Name'] || res['Vendor Name'],
          contactPerson: res['Contact person'],
          contact: res['Contact'],
          email: res['Contact Email'],
          address: res['Contact Address'],
          region: res['Region'],
          scopeOfServices: res['Scope of Services performed'],
          newSubmittal: res['New Submittal'],
        };
        console.log(obj);
        this.apiService.postVendorInfo(obj).subscribe(resp => {
          console.log(resp);
        }, (error) => {
          console.log(error);
        }, () => {
          this.loading = false;
        });
      });
    } else {
      console.log(event.data);
    }
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




