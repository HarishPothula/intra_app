import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/app.models';
import {Router} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  sendToken(token): any {
    sessionStorage.setItem('LoggedInUser', token);
  }

  getToken() {
    const user = sessionStorage.getItem('LoggedInUser');
    if (user === 'temple@adminsstaz.com') {
      return sessionStorage.getItem('LoggedInUser');
    } else {
      return null;
    }
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    sessionStorage.removeItem('LoggedInUser');
    this.route.navigate(['']);
  }
}
