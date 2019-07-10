import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-onboardings',
  templateUrl: './onboardings.component.html',
  styleUrls: ['./onboardings.component.scss']
})
export class OnboardingsComponent implements OnInit {
  public employeesData = [
    {guid: '1', firstName: 'Austin', lastName: 'Texas', phNo: '1234567890', client: 'Amex', recordId: 1234},
    {guid: '2', firstName: 'Mat', lastName: 'Luther', phNo: '1234567890', client: 'Amex', recordId: 4567},
    {guid: '3', firstName: 'Chris', lastName: 'Morris', phNo: '1234567890', client: 'Amex', recordId: 12234},
    {guid: '4', firstName: 'Jump', lastName: 'Stay', phNo: '1234567890', client: 'Amex', recordId: 123324234},
    {guid: '5', firstName: 'Val', lastName: 'King', phNo: '1234567890', client: 'Amex', recordId: 556},
    {guid: '6', firstName: 'Justin', lastName: 'Texas', phNo: '1234567890', client: 'Amex', recordId: 456456},
  ];

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getConsultantsInfo().subscribe((res: any) => {
      // this.employeesData = res;
    });
  }

  onDelete(row) {
    this.employeesData.forEach(res => {
      if (row.guid === res.guid) {
        const index = this.employeesData.indexOf(res);
        this.employeesData.splice(index, 1);
      }
    });
  }

  onEdit(row) {
    this.router.navigate(['/app/admin'], {queryParams: {recordId: row.recordId}});
  }
}
