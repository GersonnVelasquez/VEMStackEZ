import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Token } from '../models/token.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthStateService {
  isSessionActive$ = new BehaviorSubject<boolean>(false);
  userInfo$ = new BehaviorSubject<User | null>(null);
  token: Token | null = null;

  constructor(private storage: StorageService, private authService: AuthService) {
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
    this.authService.getUserData(userName).then(user => {
      this.userInfo$.next(user);
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
  }

}
