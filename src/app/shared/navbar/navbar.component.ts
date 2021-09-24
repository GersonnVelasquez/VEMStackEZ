import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/services/auth-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title = '';
  @Input() showBackButton = true;
  @Input() showUserButton = true;


  constructor(private auth:AuthStateService, private router: Router) { }

  ngOnInit(): void {
  }

  async signOut(){
   await this.auth.singOut();
   this.router.navigateByUrl('');
  }

}
