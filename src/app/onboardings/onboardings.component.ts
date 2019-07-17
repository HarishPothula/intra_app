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
    this.getConsultants();
  }

  getConsultants() {
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
    this.apiService.deleteConsultantById(row.recordId).subscribe(res => {
      this.getConsultants();
    });
  }

  onEdit(row) {
    this.router.navigate(['/app/admin'], {queryParams: {recordId: row.recordId}});
  }
}
