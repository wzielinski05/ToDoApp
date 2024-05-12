import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav/nav-link/nav-link.component';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavLinkComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private toast: NgToastService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  email = new FormControl('');
  password = new FormControl('');
  private apiUrl = 'http://localhost:3000/user/login';

  login() {
    const bodyContent = JSON.stringify({
      email: this.email.value,
      password: this.password.value,
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
        // console.log(result.json());
        result.json().then((json) => {
          this.localStorage.setItem('token', json.token);
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
