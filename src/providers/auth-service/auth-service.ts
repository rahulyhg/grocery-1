import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
//let apiUrl = 'http://localhost/phpapi/api/';
let apiUrl = 'https://vijaychauhanssn.000webhostapp.com/phpapi/api/';
@Injectable()
export class AuthServiceProvider {
  constructor(public http : Http) {
    console.log('Hello AuthServiceProvider Provider');
}
postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      return this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
         .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
