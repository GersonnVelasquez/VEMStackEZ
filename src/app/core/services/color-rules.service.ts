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
      console.log(data);
    });
  }

  getColorRulesData(): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.colorRules$.subscribe(data => {
        if(data){
          resolve(data);
        }
      });
    });
  }

  selectColorRule(colorRule: any) {
    this.colorRuleSelected$.next(colorRule);
  }

  resetColorRuleSelected() {
    this.colorRuleSelected$.next(null);
  }
  
}
