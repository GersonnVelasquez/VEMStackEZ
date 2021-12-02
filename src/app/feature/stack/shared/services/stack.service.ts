import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { YardLayout } from '../models/yard-layout.model';
import { ActiveUnit, Units } from '../models/units.model';
import { ColorRulesService } from 'src/app/core/services/color-rules.service';

@Injectable()
export class StackService {

  constructor(private http: HttpService, private colorRulesServices: ColorRulesService) { }


  // /getActiveYardLayout  ?id=LocationId

  getYardLayout(RecordId: number) {
    return this.http.doGet(environment.svrBackEnd + 'api/YardLayouts?id=' + RecordId, false).pipe(
      map(item => {
        let res: YardLayout | null = item
        return res;
      })
    ).toPromise();
  }

  getUnits(row: string, yardId: number, colorGroupId: number) {
    let colorGroup = colorGroupId ? `&colorCodeGroupId=${colorGroupId}` : '';
    return this.http.doGet(environment.svrBackEnd + `api/ClerkStackEZ/v2/GetInventory?row=${row}&YardId=${yardId}${colorGroup}`).pipe(
      map(item => {
        let res: Units = item
        return res;
      })
    ).toPromise();
  }

  updateUnitLocation(unit: ActiveUnit | any) {
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

  getUnitsByUnitNumber(unitNumber: string, yardId: number) {
    return this.http.doGet(environment.svrBackEnd + `/api/ClerkStackEZ/GetActiveUnits?yardId=${yardId}&UnitNumber=${unitNumber}`).pipe(
      map(item => {
        let res: ActiveUnit[] = item.ActiveUnits
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
