import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public userName: any;
  public currentRoute: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((url: any) => {
      this.currentRoute = url.url;
    });
    if (!this.currentRoute) {
       this.currentRoute = this.router.url;
    }

    this.userName = sessionStorage.getItem('LoggedInUser');
  }

}
