import { Component, OnInit, ViewChild } from '@angular/core';
import { YardStorageService } from 'src/app/core/storage/yard-storage.service';
import { StackComponent } from 'src/app/feature/stack/components/stack/stack.component';
import { IntructionsComponent } from '../intructions/intructions.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Options = Options;
  cargando = true;
  watingForSelectLocation = false;
  currentOption = Options.INSTRUCTION;
  isntructionMode = false;
  options = {
    showStack1: false,
    showStack2: false,
    showInstruction1: false,
    showInstruction2: false,
    panel1Ok: false,
    panel2Ok: false,
  }

  constructor(private yardStorageService: YardStorageService) { }

  ngOnInit(): void {
    this.yardStorageService.isntructionMode$.subscribe(mode => {
      this.isntructionMode = mode.data;
      if (mode.data) {
        this.segmentChanged(Options.INVENTORY);
      }
    });

    this.yardStorageService.watingForSelectLocation$.subscribe(isWaiting => {
      this.watingForSelectLocation = isWaiting.data;
      if (isWaiting.data) {
        this.segmentChanged(Options.INVENTORY);
      }
    });

    this.yardStorageService.homeTabChange$.subscribe(segment => {
      this.segmentChanged(segment);
    });


  }


  resetLeft() {
    this.options.panel2Ok = false;
    this.options.showInstruction2 = false;
    this.options.showStack2 = false;
  }


  resetRight() {
    this.options.panel1Ok = false;
    this.options.showInstruction1 = false;
    this.options.showStack1 = false;
  }




  get showInventory() {
    if (this.currentOption === Options.INVENTORY) {
      return true;
    }
    return false;
  }

  get showInstructions() {
    if (this.currentOption === Options.INSTRUCTION) {
      return true;
    }
    return false;
  }

  get showListView() {
    if (this.currentOption === Options.LISTVIEW) {
      return true;
    }
    return false;
  }


  get showSplit() {
    if (this.currentOption === Options.SPLIP) {
      return true;
    }
    return false;
  }


  segmentChanged(event: Options) {
    this.currentOption = event;
  }
}


export enum Options {
  INSTRUCTION = '1',
  INVENTORY = '2',
  SPLIP = '3',
  LISTVIEW = '4'
}