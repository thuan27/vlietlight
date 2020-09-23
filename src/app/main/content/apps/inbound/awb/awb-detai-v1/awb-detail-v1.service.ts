import { Functions } from '../../../../../../../@fuse/core/function';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class AWBDetailV1Service {

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
    // const bucket = new S3(
    //   {
    //     accessKeyId: 'YOUR-ACCESS-KEY-ID',
    //     secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
    //     region: 'us-east-1'
    //   }
    // );

    // const params = {
    //   Bucket: 'jsa-angular4-bucket',
    //   Key: this.FOLDER + file.name,
    //   Body: file
    // };

    // bucket.upload(params, function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }

    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
    return this.http.post(this.apiConfig.AWB_FILE, file, options);

  }
}
