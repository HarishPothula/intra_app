import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {ExcelService} from '../../services/excel.service';
import {AuditModalComponent} from '../audit-modal/audit-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ShowModalComponent} from '../show-modal/show-modal.component';
import * as moment from 'moment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.scss']
})
export class ConsultantListComponent implements OnInit {
  public resourceList: any;
  public loading: boolean;

  constructor(private apiService: ApiService,
              private router: Router,
              private excel: ExcelService,
              public modalService: NgbModal) {
  }

  ngOnInit() {
    this.getResource();
    this.loading = false;
  }

  getResource() {
    this.apiService.getResourceInfo().subscribe((res: any) => {
      this.loading = true;
      const data_array = [];
      res.forEach(q => {
        const a = JSON.parse(q.resp_data);
        data_array.push(a);
      });
      this.resourceList = data_array;
      console.log(this.resourceList);
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
        this.apiService.deleteResourceById(row.resourceId).subscribe(res => {
          swal.fire(
            'Deleted!',
            'Your Record has been deleted.',
            'success'
          );
          this.getResource();
        });
      }
    });
  }

  onEdit(row) {
    this.router.navigate(['/app/admin'], {queryParams: {recordId: row.resourceId}});
  }

  onUpload(event: { type: string, data: any }) {
    this.loading = true;
    if (event.type === 'success') {
      console.log(event.data);
      event.data.forEach(res => {
        const obj = {
          resourceId: res['Resource ID'] || res['ï»¿Resource ID'],
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
          createdBy: 'Admin',
          createdOn: moment().format(),
          updatedBy: 'Admin',
          updatedOn: moment().format()
        };
        if (this.resourceList && this.resourceList.length > 0) {
          if (this.resourceList.findIndex((item) => item.resourceId === obj.resourceId)) {
            console.log('recorde Exist', obj.resourceId);
            this.apiService.updateResourceById(obj, obj.resourceId).subscribe(resp => {
              this.loading = true;
              console.log(resp);
            }, (error) => {

            }, () => {
              this.loading = false;
              this.getResource();
            });
          } else {
            console.log('New Record', obj.resourceId);
            this.apiService.postResourceInfo(obj).subscribe(resp => {
              this.loading = true;
              console.log(resp);
            }, (error) => {

            }, () => {
              this.loading = false;
              this.getResource();
            });
          }
        } else {
          console.log('New Record', obj.resourceId);
          this.apiService.postResourceInfo(obj).subscribe(resp => {
            this.loading = true;
            console.log(resp);
          }, (error) => {

          }, () => {
            this.loading = false;
            this.getResource();
          });
        }
      });
    } else {
      console.log(event.data);
    }
    this.loading = false;
  }

  onDownload() {
    const parsedResourceList = [];
    this.resourceList.forEach(res => {
      const parsedResource = {
        'Resource ID': res.resourceId,
        'Resource First Nam': res.resourceFirstName,
        'Resource Middle Name': res.resourceMiddleName,
        'Resource Last Name': res.resourceLastName,
        'Location Description': res.location,
        'Location Address 1': res.locationaddress,
        'Location City': res.city,
        'Location State': res.state,
        'Location Country': res.country,
        'Leader Level 3': res.leaderLevel3,
        'Leader Level 4': res.leaderLevel4,
        'Leader Level 5': res.leaderLevel5,
        'Leader Level 6': res.leaderLevel6,
        'Normalized Vendor': res.normalizedVendor,
        'Resource Classification': res.resourceClassification,
        'Employee/Sub-Contractor': res.employeeOrSubCon,
        'Sub-Contractor Company Name': res.subContractorCompany,
        'Resource Status': res.resourceStatus,
        'Start Date': res.startDate,
        'Notification Date Resource Leaving': res.notificationdateResourceLeaving,
        'Departure Date': res.departureDate,
        'Defined as Key Personnel': res.definedAsKeyPersonnel,
        'Defined as Critical Resource': res.definedAsCriticalresource,
        'Non T&M (On-Shore or Off-Shore)': res.onShoreOffShore,
        'Non T&M (On-Site or Off-Site)': res.onSiteOffSite,
        'Project ID': res.projectId,
        'Role Title/Job Description': res.role,
        'Premium Technology/Skillset (if applicable)': res.premiumTechnology,
        'PO/SOW Number': res.poNumber,
        'ADS ID': res.adsId,
        'AMEX Laptop / Desktop Asset Number ': res.laptopNo,
        'Resource Visa Status ': res.visaStatus,
        'Visa Expiration Date': res.visaexpiration,
        'Background Completion End Date': res.bgvCompletionEndDate,
        'Commodity': res.commodity,
        'New Resource Expected Rate': res.newResourceExpectedRate,
        'New Resource Assignment period (e.g.: 3 months) ': res.assignmentPeriod,
        'New Resource Rate Exception': res.resouceRateException,
        'Commentary': res.commentary,
        'Misc.': res.misc,
      };
      parsedResourceList.push(parsedResource);
    });
    this.excel.exportAsExcelFile(parsedResourceList, 'List Of Resources');
  }

  onAudit(row) {
    const modalRef = this.modalService.open(AuditModalComponent, {size: 'lg', backdrop: 'static'});
    this.apiService.getresourceAuditById(row.resourceId).subscribe((res: any) => {
      const data_array = [];
      res.forEach(q => {
        const a = JSON.parse(q.resp_data);
        data_array.push(a);
      });
      console.log(data_array);
      modalRef.componentInstance.src = data_array;
    });
  }

  onShow(row) {
    const modalRef = this.modalService.open(ShowModalComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.src = row;
    console.log(row);
  }


}
