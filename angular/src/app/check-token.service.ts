import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  private apiUril = 'http://localhost:3000/tasks';
  isValid() {
    const headersList = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
    return fetch(this.apiUril, {
      method: 'GET',
      headers: headersList,
    }).then((result) => {
      return result.status == 200;
    });
  }
}
