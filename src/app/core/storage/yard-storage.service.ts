import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { YardLocation } from 'src/app/feature/stack/shared/models/yard.model';
import { NormalState } from 'src/app/feature/stack/shared/state-class/normalMode.state';
import { State } from 'src/app/feature/stack/shared/state-class/state.abstract';

@Injectable()
export class YardStorageService {
  isntructionMode$ = new BehaviorSubject<emiter>({ origen: 'Incial', data: false });
  workInstructionSelected$ = new BehaviorSubject<emiter>({ origen: '', data: false });
  unitSelected$ = new Subject<emiter>();
  updateData$ = new Subject<emiter>();
  resetUnitSelected$ = new Subject<emiter>();
  unitSelectedForSelectLocation$ = new Subject<emiter>();
  watingForSelectLocation$ = new Subject<emiter>();
  cancelWatingForSelectLocation$ = new Subject<emiter>();
  instructionSelected$ = new Subject<emiter>();



  unitSelected$N = new BehaviorSubject<YardLocation | null>(null);
  state$N = new BehaviorSubject<State>(new NormalState());

  constructor() { }
}

export interface emiter {
  origen: string,
  data: any,
  destino?: string
}