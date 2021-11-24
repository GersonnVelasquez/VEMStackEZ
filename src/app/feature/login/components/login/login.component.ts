import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/auth-state.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements ViewDidEnter, OnInit, ViewDidLeave {
  hide = true;
  keep = false;
  sessionSuscription: Subscription;
  constructor(private auth: AuthStateService, private router: Router,private loading: LoadingService) { }

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

  async singIn(user: string, password: string) {
    try {
      await this.auth.singIn(user, password, this.keep);
      this.router.navigateByUrl('Home', { replaceUrl: true });
    } catch (error) {
      throw new Error('Invalid Credentials')
    }
  }

}
