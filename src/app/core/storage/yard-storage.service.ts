import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { unit } from 'src/app/feature/stack/shared/models/yard.model';

@Injectable()
export class YardStorageService {
  isntructionMode$ = new BehaviorSubject<emiter>({ origen: 'Incial', data: false });
  workInstructionSelected$ = new BehaviorSubject<emiter>({ origen: '', data: false });
  unitSelected$ = new BehaviorSubject<unit | null>(null);
  updateData$ = new Subject<emiter>();
  resetUnitSelected$ = new Subject<emiter>();
  unitSelectedForSelectLocation$ = new Subject<emiter>();
  watingForSelectLocation$ = new Subject<emiter>();
  cancelWatingForSelectLocation$ = new Subject<emiter>();
  instructionSelected$ = new Subject<emiter>();
  constructor() { }
}

export interface emiter {
  origen: string,
  data: any,
  destino?: string
}