import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public onboardingData: any;

  constructor(private http: HttpClient) {
  }

  getStates() {
    return this.http.get('../assets/json/states.json');
  }

  sendEmail(value) {
    return this.http.post('http://localhost:3000/sendemail', value);
  }

  getOnboadingDataById(id) {
    return this.http.get('../assets/json/onboarding.json');
  }

  postVendorInfo(info) {
    return this.http.post('http://localhost:3000/postVendorInfo', info);
  }

  getVendorInfo() {
    return this.http.get('http://localhost:3000/getVendorInfo');
  }

  deleteVendorRecord(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/deleteVendorRecord', id$);
  }

  getVendorById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/vendorById', id$);
  }
}
