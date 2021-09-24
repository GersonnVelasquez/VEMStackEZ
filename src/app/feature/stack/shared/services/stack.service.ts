import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { YardLayout } from '../models/yard-layout.model';
import { ActiveUnit, Units } from '../models/units.model';

@Injectable()
export class StackService {

  constructor(private http: HttpService) { }


  // /getActiveYardLayout  ?id=LocationId

  getYardLayout(RecordId: number) {
    return this.http.doGet(environment.svrBackEnd + 'api/YardLayouts?id=' + RecordId).pipe(
      map(item => {
        let res: YardLayout = item
        return res;
      })
    ).toPromise();
  }

  getUnits(row: string, yardId: number) {
    return this.http.doGet(environment.svrBackEnd + `api/ClerkStackEZ/GetInventory?row=${row}&YardId=${yardId}`).pipe(
      map(item => {
        let res: Units = item
        return res;
      })
    ).toPromise();
  }

  updateUnitLocation(unit: ActiveUnit) {
    return this.http.doPost(environment.svrBackEnd + 'api/ClerkStackEZ/updateunitlocation', unit).pipe(
      map(item => {
        let res: string = item
        return res;
      })
    ).toPromise();
  }



  notifyLostUnit(unitId: string, yardId: number) {
    return this.http.doPost(environment.svrBackEnd + `/api/ClerkStackEZ/LostUnit?activeUnitId=${unitId}&yardId=${yardId}`, {}).pipe(
      map(item => {
        let res: string = item
        return res;
      })
    ).toPromise();
  }


  createWorkInstruction(unit: ActiveUnit) {
    return this.http.doPost(environment.svrBackEnd + 'api/ClerkStackEZ/CreateworkInstruction', unit).pipe(
      map(item => {
        let res: string = item
        return res;
      })
    ).toPromise();
  }

}
