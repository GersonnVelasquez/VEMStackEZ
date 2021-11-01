import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Response } from '../models/response.model';
import { Token } from '../models/token.model';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  doGet(url: string) {
    return this.http.get<Response>(url).pipe(
      map(res => {
        let newRes = new Response(res);
        if (newRes.isError) {
          throw new Error(newRes.Details)
        };
        return newRes.getJsonData;
      })
    );
  }

  doDelete(url: string) {
    return this.http.delete<Response>(url).pipe(
      map(res => {
        let newRes = new Response(res);
        if (newRes.isError) {
          throw new Error(newRes.Details)
        };
        return newRes.Details;
      })
    );
  }

  doPost(url: string, body: any, headers?: any) {
    return this.http.post<Response>(url, body, { headers: headers }).pipe(
      map(res => {
        let newRes = new Response(res);
        if (newRes.isError) {
          throw new Error(newRes.Details)
        };
        return newRes.Details;
      })
    );
  }

  doPut(url: string, body: any, headers?: any) {
    return this.http.put<Response>(url, body, { headers: headers }).pipe(
      map(res => {
        let newRes = new Response(res);
        if (newRes.isError) {
          throw new Error(newRes.Details)
        };
        return newRes.Details;
      })
    );
  }


  doTokenPost(url: string, body: any, headers?: any) {
    return this.http.post(url, body, { headers: headers }).pipe(
      map((res: any) => {
        let newRes = new Token(res);
        
        return newRes;
      }));
  }

}