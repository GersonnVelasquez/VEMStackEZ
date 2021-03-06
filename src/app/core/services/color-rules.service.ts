import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class ColorRulesService {
  colorRuleSelected$ = new BehaviorSubject<any>(null);
  colorRules$ = new BehaviorSubject<any[]>([]);
  constructor(private httpServices: HttpService) { }

  getColorRules(locationId: number) {
    return this.httpServices.doGet(environment.svrBackEnd + 'api/ColorRulesGroups/GetColorRulesGroupsByLocation?id=' + locationId)
    .toPromise()
    .then(data=>{
      this.colorRules$.next(data);
    });
  }

  getColorRulesData(): Promise<any[]>{
    return new Promise((resolve, reject) => {
      resolve(this.colorRules$.getValue());
    });
  }

  getColorRulesSelected(): Promise<any>{
    return new Promise((resolve, reject) => {
      resolve(this.colorRuleSelected$.getValue());
    });
  }


  selectColorRule(colorRule: any) {
    this.colorRuleSelected$.next(colorRule);
  }

  resetColorRuleSelected() {
    this.colorRuleSelected$.next(null);
  }
  
}
