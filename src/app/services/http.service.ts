import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  httpOptionsNoAuth: any;

  constructor(public http: HttpClient, public router: Router) {
    this.httpOptionsNoAuth = {
      headers: new HttpHeaders()
    };
  }

  get(url: string, params: object = {}) {
    const queryString: string = params ? ('?' + this.parseParams(params)) : '';

    return this.http.get(environment.apiURL + '/' + url + queryString, { headers: this.httpOptionsNoAuth.headers })
      .pipe(
        map((response: any) => {
          try {
            const res: any = response.json();
            return res;
          } catch (err) {
            return response;
          }
        })
      );
  }

  parseParams(params: any) {
    const urlParams: URLSearchParams = new URLSearchParams();
    for (const param in params) {
      if (params.hasOwnProperty(param) && this.isObjOrArr(params[param])) {
        for (const item in params[param]) {
          if (params[param].hasOwnProperty(item) && this.isObjOrArr(params[param][item])) {
            for (const property in params[param][item]) {
              if (params[param][item].hasOwnProperty(property) && this.isObjOrArr(params[param][item][property])) {
                for (const innerProperty in params[param][item][property]) {
                  urlParams.append(param + '[' + item + ']' + '[' + property + ']' + '[' + innerProperty + ']', params[param][item][property][innerProperty]);
                }
              } else {
                urlParams.append(param + '[' + item + ']' + '[' + property + ']', params[param][item][property]);
              }
            }
          } else {
            urlParams.append(param + '[' + item + ']', params[param][item]);
          }
        }
      } else {
        urlParams.append(param, params[param]);
      }
    }
    return urlParams.toString();
  }

  isObjOrArr(val: any) {
    return Array.isArray(val) || val instanceof Object
  }
}
