import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpService) { }

  getCustomer() {
    return this.http.doGet(environment.svrBackEnd + '/api/Customers').pipe(
      map(item => {
        // let res: Instruction[] = item.map((item: any) => {
        //   return new Instruction(item);
        // });
        return item;
      })
    ).toPromise();
  }

  getUnitsStatus() {
    return this.http.doGet(environment.svrBackEnd + '/api/UnitStatuses').pipe(
      map(item => {
        // let res: Instruction[] = item.map((item: any) => {
        //   return new Instruction(item);
        // });
        return item;
      })
    ).toPromise();
  }

  getEquipmentSizeTypes() {
    return this.http.doGet(environment.svrBackEnd + '/api/EquipmentSizeTypes').pipe(
      map(item => {
        // let res: Instruction[] = item.map((item: any) => {
        //   return new Instruction(item);
        // });
        return item;
      })
    ).toPromise();
  }

  getUnitGrades() {
    return this.http.doGet(environment.svrBackEnd + '/api/UnitGrades').pipe(
      map(item => {
        // let res: Instruction[] = item.map((item: any) => {
        //   return new Instruction(item);
        // });
        return item;
      })
    ).toPromise();
  }





}
