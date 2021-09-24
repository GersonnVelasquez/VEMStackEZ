import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Instruction } from '../models/instruction.model';
import { UnitAllocationPayload } from '../models/unit-allocation-payload.model';

@Injectable({
  providedIn: 'root'
})
export class InstructionsService {

  constructor(private http: HttpService) { }

  getInstructions(locationId: number) {
    return this.http.doGet(environment.svrBackEnd + 'api/workinstructions?id=' + locationId).pipe(
      map(item => {
        let res: Instruction[] = item.map((item: any) => {
          return new Instruction(item);
        });
        return res;
      })
    )
  }

  completeWorkInstruction(workInstruction: Instruction) {
    return this.http.doPost(environment.svrBackEnd + 'api/ClerkStackEZ/CompleteWorkInstruction', workInstruction).toPromise();
  }

  recalculateWorkInstruction(workInstruction: UnitAllocationPayload) {
    console.log(workInstruction)
    return this.http.doPut(environment.svrBackEnd + 'api/WorkInstructions/UpdateWorkInstructionPosition', workInstruction).toPromise();
  }

}
