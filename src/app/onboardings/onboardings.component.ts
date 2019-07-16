import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-onboardings',
  templateUrl: './onboardings.component.html',
  styleUrls: ['./onboardings.component.scss']
})
export class OnboardingsComponent implements OnInit {
  public employeesData: any;

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getConsultantsInfo().subscribe((res: any) => {
      const data_array = [];
      res.forEach(q => {
        const a = JSON.parse(q.data);
        data_array.push(a);
      });
      this.employeesData = data_array;
      console.log(this.employeesData);
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
