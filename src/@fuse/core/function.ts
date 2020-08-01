import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class Functions {

    // private tokenName = process.env.CONFIG['TOKEN'];
    private tokenName = localStorage.getItem(environment.token);
    constructor() { }

    getToken() {
        return localStorage.getItem(environment.token);
    }

    AuthHeaderNoTK() {
        const authHeader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return authHeader;
    }

    AuthHeader() {
        const authHeader = new HttpHeaders({
            'Authorization': 'Bearer ' + this.getToken(),
        });
        return authHeader;
    }

    AuthHeaderPost() {
      const authHeader = new HttpHeaders({
          'Authorization': 'Bearer ' + this.getToken(),
          'Content-Type': 'application/json'
      });
      return authHeader;
    }

    Pagination(data) {
        const pageCount = data['total_pages'];
        const currentPage = data['current_page'];
        const numLinks = data['numLinks'] ? data['numLinks'] : 3;
        let start = 1;
        let end = 1;
        let tmpPageCount = [];
        if (currentPage > numLinks) {
            start = currentPage - numLinks;
        } else {
            start = 1;
        }
        if (currentPage + numLinks < pageCount) {
            end = currentPage + numLinks;
        } else {
            end = pageCount;
        }
        // Create tmp for loop perPage in view
        for (let i = start; i <= end; i++) {
            tmpPageCount[i] = i;
        }
        tmpPageCount = tmpPageCount.filter(function (item) {
            return item !== undefined;
        });
        // console.log('__pagin fuction');
        return tmpPageCount;
    }

    // Error handle
  parseErrorMessageFromServer(err) {
    var errMessage = '';
    try {
      if(typeof err == 'object' && err._body) {
        err = JSON.parse(err._body);
      }
      else {
        err = err.json();
      }
      if(err.error) {
        if(typeof err.error == 'object') {
          for(let key in err.error) {
            let msgErr = typeof err.error[key] == 'string' ? err.error[key] : err.error[key][0];
            errMessage += '<p>'+ msgErr + '</p>'
          }
        }
        if(typeof err.error == 'string') {
          errMessage = err.error;
        }
      }
      else if(err.message || err.detail) {
        errMessage = err.message || err.detail;
      }
      else if(err.errors) {
        err = err.errors;
        errMessage = err.message || err.detail;
      }
    }
    catch(err) {
      // console.log('parse err', err);
    }
    if(!errMessage) {
      errMessage = "Sorry, there's a problem with the connection.";
    }
    return errMessage;
  }
}
