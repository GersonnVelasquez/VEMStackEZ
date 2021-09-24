import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/services/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  keep = false;
  constructor(private auth: AuthStateService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isSessionActive$.subscribe(active => {
      if (active) {
        this.router.navigateByUrl('Home');
      }
    })
  }

  singIn(user: string, password: string) {
    this.auth.singIn(user, password, this.keep).then(() => this.router.navigateByUrl('Home')).catch(() => alert('error'))
  }

}
