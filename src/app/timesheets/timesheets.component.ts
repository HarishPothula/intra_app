import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss']
})
export class TimesheetsComponent implements OnInit {
  public days = [];
  public weekStart: any;
  public weekEnd: any;
  public currentDate: any;

  constructor() {
  }

  ngOnInit() {
    this.TodoCtrl();
  }

  TodoCtrl() {
    this.days = [];
    const currentDate = moment();
    this.weekStart = currentDate.clone().startOf('week');
    this.weekEnd = currentDate.clone().endOf('week');
    this.currentDate = moment(currentDate).isSame(new Date(), 'week');
    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(this.weekStart).add(i, 'days').format('ddd'));
    }
  }

  onPrevious() {
    this.days = [];
    const currentDate = moment().subtract(1, 'week');
    this.weekStart = currentDate.clone().startOf('week');
    this.weekEnd = currentDate.clone().endOf('week');
    this.currentDate = moment(currentDate).isSame(new Date(), 'week');
    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(this.weekStart).add(i, 'days').format('ddd'));
    }
  }

  onNext() {
    this.TodoCtrl();
  }
}
