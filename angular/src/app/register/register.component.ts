import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav/nav-link/nav-link.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavLinkComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private toast: NgToastService) {}
  email = new FormControl('');
  password = new FormControl('');
  apiUrl = 'http://localhost:3000/user/signup';

  onClick() {
    const bodyContent = JSON.stringify({
      email: this.email.value,
      password: this.password.value,
    });

    const headersList = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
    console.log(this.email);

    fetch(this.apiUrl, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    })
      .then((result) => {
        console.log(result);
        if (result.status == 201) {
          this.toast.success({
            detail: 'Konto stworzone',
            summary: 'Zaloguj się',
            duration: 5000,
          });
        } else {
          this.toast.error({
            detail: 'Błąd',
            summary: 'Nie udalo się stworzyć konta',
            duration: 5000,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        this.toast.error({
          detail: 'Błąd',
          summary: 'Nie udalo się stworzyć konta',
          duration: 5000,
        });
      });
  }
}
