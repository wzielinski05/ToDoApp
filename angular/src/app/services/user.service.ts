import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private toast: NgToastService, private router: Router) {}
  private apiUrl = 'http://localhost:3000/user/login';

  signout() {
    localStorage.clear();
    window.location.reload();
  }
  isLogin() {
    return localStorage.getItem('token') ? true : false;
  }
  login(email: FormControl, password: FormControl) {
    const bodyContent = JSON.stringify({
      email: email.value,
      password: password.value,
    });

    const headersList = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };

    fetch(this.apiUrl, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    }).then((result) => {
      if (result.status == 200) {
        this.toast.success({
          detail: 'Zalogowno',
          duration: 5000,
        });
        result.json().then((json) => {
          console.log(json);
          localStorage.setItem('username', email.value);
          localStorage.setItem('token', json.token);
          this.router.navigate(['/list']);
        });
      } else {
        this.toast.error({
          detail: 'Błąd',
          summary: 'Nie udalo się zalogować',
          duration: 5000,
        });
      }
    });
  }
}
