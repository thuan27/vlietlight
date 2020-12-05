import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Functions } from '@fuse/core/function';
import { APIConfig } from 'app/main/content/pages/authentication/config';

@Injectable()
export class CreateOrderService
{
    constructor(
        private http: HttpClient,
        private _Func: Functions,
        private apiConfig: APIConfig
    )
    {
    }

    create(param) {
        return this.http.post(this.apiConfig.ORDER_LIST + '/store', param);
    }

    getDetail(params) {
        return this.http.get(this.apiConfig.ORDER_LIST + '/' + params);
    }

    update(id, param) {
        return this.http.put(this.apiConfig.ORDER_LIST + '/update/' + id, param);
    }

    getCountry() {
      return this.http.get(this.apiConfig.GET_COUNTRY);
    }

    getEventTracking(params) {
      return this.http.get(this.apiConfig.ORDER_EVENT_TRACKING + params);
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

    deleteFiled(idFile) {
      return this.http.delete(this.apiConfig.AWB_EVENT_TRACKING_DELETE + '/' + idFile);
    }
}
