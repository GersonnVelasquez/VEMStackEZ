import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements ViewDidEnter, OnInit, ViewDidLeave {
  hide = true;
  keep = false;
  sessionSuscription: Subscription;
  constructor(private auth: AuthStateService, private router: Router) { }

  ngOnInit() {
    this.sessionSuscription = this.auth.isSessionActive$.subscribe(active => {
      if (active) {
        this.router.navigateByUrl('Home');
      }
    })
  }

  ionViewDidEnter() {
    this.sessionSuscription = this.auth.isSessionActive$.subscribe(active => {
      if (active) {
        this.router.navigateByUrl('Home');
      }
    })
  }
  ionViewDidLeave() {
    this.sessionSuscription.unsubscribe();
  }

  singIn(user: string, password: string) {
    this.auth.singIn(user, password, this.keep).then(() => this.router.navigateByUrl('Home', { replaceUrl: true })).catch(() => { throw new Error("Invalid Credentials") })
  }

}
