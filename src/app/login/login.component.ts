import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.sendToken(this.loginForm.value.userName);
    if (this.loginForm.value.userName === 'admin') {
      this.router.navigate(['/app/admin']);
    } else if (this.loginForm.value.userName === 'employee') {
      this.router.navigate(['/app/timesheets']);
    }

    this.authenticationService.sendToken(this.loginForm.value.userName);
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.loading = false;
    //     });
  }
}
