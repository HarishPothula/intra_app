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
    return this.http.post('http://localhost:3000/email/sendemail', value);
  }

  getOnboadingDataById(id) {
    return this.http.get('../assets/json/onboarding.json');
  }

  postVendorInfo(info) {
    return this.http.post('http://localhost:3000/vendor/postVendorInfo', info);
  }

  getVendorInfo() {
    return this.http.get('http://localhost:3000/vendor/getVendorInfo');
  }

  deleteVendorRecord(id) {
    const id$ = {vendorName: id};
    return this.http.post('http://localhost:3000/vendor/deleteVendorRecord', id$);
  }

  getVendorById(id) {
    const id$ = {vendorName: id};
    return this.http.post('http://localhost:3000/vendor/vendorById', id$);
  }

  updateVendorById(id, data) {
    const id$ = {vendorName: id, data$: data};
    return this.http.post('http://localhost:3000/vendor/updatevendorById', id$);
  }

  postConsultantInfo(info) {
    return this.http.post('http://localhost:3000/consultant/postConsultantInfo', info);
  }

  getConsultantsInfo() {
    return this.http.get('http://localhost:3000/consultant/getConsultantsInfo');
  }

  getConsultantsInfoById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/consultant/consultantById', id$);
  }

  updateConsultantById(data, id) {
    const id$ = {record_id: id, data$: data};
    return this.http.post('http://localhost:3000/consultant/updateConsultantById', id$);
  }

  deleteConsultantById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/consultant/deleteConsultantRecord', id$);
  }

  postResourceInfo(info) {
    return this.http.post('http://localhost:3000/resource/postresourceInfo', info);
  }

  getResourceInfo() {
    return this.http.get('http://localhost:3000/resource/getResourceInfo');
  }

  updateResourceById(data, id) {
    const id$ = {record_id: id, data$: data};
    return this.http.post('http://localhost:3000/resource/updateResourceById', id$);
  }

  getresourceAuditById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/resource/esourceAuditById', id$);
  }

  deleteResourceById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/resource/deleteResourceRecord', id$);
  }
  getResourceInfoById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/resource/resourcetById', id$);
  }

}
