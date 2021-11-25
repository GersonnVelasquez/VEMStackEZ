import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Token } from '../models/token.model';
import { AuthService } from './auth.service';
import { User, UserAccessLocation } from '../models/user.model';
import { ColorRulesService } from './color-rules.service';
import { Location } from 'src/app/feature/stack/shared/models/units.model';
import { MatDialog } from '@angular/material/dialog';
import { LocationSelectDialogComponent } from '../components/location-select-dialog/location-select-dialog.component';

@Injectable()
export class AuthStateService {
  isSessionActive$ = new BehaviorSubject<boolean>(false);
  userInfo$ = new BehaviorSubject<User | null>(null);
  locationActive$ = new BehaviorSubject<UserAccessLocation | null>(null);
  token: Token | null = null;

  constructor(private colorRules: ColorRulesService, private storage: StorageService, private authService: AuthService,public dialog: MatDialog) {
    this.storage.getItem('user').then(async (user: User) => {
      if (user) {
        this.token = await this.storage.getItem('token');
        await this.getUserData(user.LoginName);
        this.isSessionActive$.next(true);
      };
    })
  }

  get isSessionActive() {
    return this.isSessionActive$.getValue();
  }

  get userInfo() {
    return this.userInfo$.getValue();
  }

  async singIn(user: string, password: string, keep: boolean) {
    this.token = await this.authService.singIn(user, password);
    if (keep) {
      await this.storage.setItem('token', this.token, this.token.expires_in);
    }
    await this.getUserData(user, keep);
    this.isSessionActive$.next(true);
  }

  async getUserData(userName: string, keep?: boolean) {
    this.authService.getUserData(userName).then(async (user) => {
      this.userInfo$.next(user);

      if (user.UserAccessLocations.length > 1) {
        const dialogRef = this.dialog.open(LocationSelectDialogComponent, {
          width: '350px',
          data: user.UserAccessLocations,
          disableClose: true
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.locationActive$.next(result);
        });
      } else {
        this.locationActive$.next(user.UserAccessLocations[0]);
      }

      await this.colorRules.getColorRules(user.Location.LocationId);
      if (keep) {
        this.storage.setItem('user', user, this.token?.expires_in);
      }
    });
  }

  async singOut() {
    await this.storage.removeItem('user');
    await this.storage.removeItem('token');
    this.isSessionActive$.next(false);
    this.userInfo$.next(null);
    this.colorRules.resetColorRuleSelected();
  }

}
