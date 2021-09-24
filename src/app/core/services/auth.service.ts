import {  HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpService) { }

  singIn(user: string, password: string) {
    let params = new HttpParams()
      .set('username', user)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.doTokenPost(environment.svrBackEnd + 'api/token', params.toString(), { headers: this.headers }).toPromise();
  }


  getUserData(userName: string) {
    return this.http.doGet(environment.svrBackEnd + 'api/Users/' + userName).pipe(
      map(res => {
        let newRes:User = res;
        return newRes;
      })).toPromise();;
  }

}
