import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenService {
  constructor() {}
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
