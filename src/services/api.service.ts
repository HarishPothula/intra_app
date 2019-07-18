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
    const id$ = {vendorName: id};
    return this.http.post('http://localhost:3000/deleteVendorRecord', id$);
  }

  getVendorById(id) {
    const id$ = {vendorName: id};
    return this.http.post('http://localhost:3000/vendorById', id$);
  }

  updateVendorById(id, data) {
    const id$ = {vendorName: id, data$: data};
    return this.http.post('http://localhost:3000/updatevendorById', id$);
  }

  postConsultantInfo(info) {
    return this.http.post('http://localhost:3000/postConsultantInfo', info);
  }

  getConsultantsInfo() {
    return this.http.get('http://localhost:3000/getConsultantsInfo');
  }

  getConsultantsInfoById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/consultantById', id$);
  }

  updateConsultantById(data, id) {
    const id$ = {record_id: id, data$: data};
    return this.http.post('http://localhost:3000/updateConsultantById', id$);
  }

  deleteConsultantById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/deleteConsultantRecord', id$);
  }

  postResourceInfo(info) {
    return this.http.post('http://localhost:3000/postresourceInfo', info);
  }

  getResourceInfo() {
    return this.http.get('http://localhost:3000/getResourceInfo');
  }

  updateResourceById(data, id) {
    const id$ = {record_id: id, data$: data};
    return this.http.post('http://localhost:3000/updateResourceById', id$);
  }

  getresourceAuditById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/resourceAuditById', id$);
  }

  deleteResourceById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/deleteResourceRecord', id$);
  }
  getResourceInfoById(id) {
    const id$ = {record_id: id};
    return this.http.post('http://localhost:3000/resourcetById', id$);
  }

}
