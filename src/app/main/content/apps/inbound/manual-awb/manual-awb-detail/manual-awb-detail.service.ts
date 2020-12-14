import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class ManualAWBDetailService {

  FOLDER = 'jsa-s3/';
  constructor(
    private http: HttpClient,
    private _Func: Functions,
    private apiConfig: APIConfig
  ) {
  }

  createAWB(param) {
    return this.http.post(this.apiConfig.CREATE_AWB, param);
  }

  updateAWB(param, id) {
    return this.http.put(`${this.apiConfig.CREATE_AWB}/${id}`, param);
  }

  getCountry(data) {
    return this.http.get(this.apiConfig.COUNTRY_LIST + '?country_name=' + data);
  }

  getStatus() {
    return this.http.get(this.apiConfig.GET_STATUS);
  }

  uploadfile(file) {
    let formData = new FormData();
    formData.append('file', file);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
      withCredentials: true,
  }
    return this.http.post(this.apiConfig.AWB_FILE, file, options);
  }

  getAWB(id) {
    return this.http.get(`${this.apiConfig.CREATE_AWB}/${id}`);
  }

  getUploadFile(transaction, doc_type) {
    return this.http.get(`${this.apiConfig.AWB_FILE}?transaction=${transaction}&doc_type=${doc_type}`)
  }

  getEventTracking(params) {
    return this.http.get(this.apiConfig.AWB_EVENT_TRACKING + params);
  }

  deleteFiled(idFile) {
    return this.http.delete(this.apiConfig.AWB_EVENT_TRACKING_DELETE + '/' + idFile);
  }
}
