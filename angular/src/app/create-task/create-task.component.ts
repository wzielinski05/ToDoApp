import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LocalStorageService } from '../local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  constructor(
    private toast: NgToastService,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {
    if (!this.userService.isLogin()) {
      this.router.navigate(['']);
    }
  }

  private apiUrl = 'http://localhost:3000/tasks';

  name = new FormControl('');
  body = new FormControl('');

  create() {
    const bodyContent = JSON.stringify({
      name: this.name.value,
      body: this.body.value,
    });
    const headersList = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    };

    fetch(this.apiUrl, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    }).then((result) => {
      if (result.status == 201) {
        this.toast.success({
          detail: 'Utworzono zadanie',
          duration: 3000,
        });
        this.router.navigate(['/list']);
      } else {
        this.toast.error({
          detail: 'Błąd',
          duration: 2000,
        });
      }
    });
  }
}
