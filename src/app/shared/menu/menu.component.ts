import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthStateService } from 'src/app/core/services/auth-state.service';
import { YardStorageService } from 'src/app/core/storage/yard-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isSessionActive = false;
  isInstructionMode = false;
  constructor(private auth: AuthStateService, private router: Router, private yardStorageService: YardStorageService,private menu: MenuController) { }

  ngOnInit(): void {
    this.auth.isSessionActive$.subscribe(data=>{
      this.isSessionActive =data;
    });
  }



  enterWorkInstructionMode() {
    this.yardStorageService.isntructionMode$.next({ origen: 'Nemu', data: true });
    this.isInstructionMode = true;
  }
  exitWorkInstructionMode() {
    this.yardStorageService.isntructionMode$.next({ origen: 'Nemu', data: false });
    this.isInstructionMode = false;
  }

  async signOut() {
    await this.auth.singOut();
    this.router.navigateByUrl('');
  }

  close() {
    this.menu.close('menu');
  }

}
