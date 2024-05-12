import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private localStorage: LocalStorageService) {}

  signout() {
    this.localStorage.removeItem('token');
    window.location.reload()
  }
  isLogin() {
    return this.localStorage.getItem('token') ? true : false;
  }
}
