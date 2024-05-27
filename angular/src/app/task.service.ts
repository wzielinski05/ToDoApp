import { Injectable } from '@angular/core';
import Itask from './Itask';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private toast: NgToastService, private router: Router) {}

  private apiUrl = 'http://localhost:3000/tasks';

  private headersList = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  edit(id: string, params: Itask, backToList?: boolean): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
      headers: this.headersList,
    }).then((result) => {
      if (result.status == 200) {
        this.toast.success({
          detail: 'Zaktualizowano',
          duration: 2000,
        });
        if (backToList) {
          this.router.navigate(['/list']);
        }
      } else {
        this.toast.error({
          detail: 'Błąd',
          summary: 'Nie udalo się zaktulizować',
          duration: 5000,
        });
      }
    });
  }

  delete(id: string, backToList?: boolean) {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: this.headersList,
    }).then((result) => {
      if (result.status == 200) {
        this.toast.success({
          detail: 'Usunięto',
          duration: 2000,
        });
        if (backToList) {
          this.router.navigate(['/list']);
        }
      } else {
        this.toast.error({
          detail: 'Błąd',
          summary: 'Nie udalo się usunąć',
          duration: 5000,
        });
      }
    });
  }
}
