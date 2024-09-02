import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TaskListRowComponent } from './task-list-row/task-list-row.component';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskListRowComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) {
    if (!this.userService.isLogin()) {
      this.router.navigate(['']);
      this.toast.info({
        detail: 'Nie jesteś zalogowany'
      })
    } else {
      fetch(this.apiUrl, {
        method: 'GET',
        headers: this.headersList,
      }).then((result) => {
        result.json().then((json) => {
          this.tasksCompleted = json.tasks.filter(
            (task: any) => !task.isCompleted
          );
          this.tasksUncompleted = json.tasks.filter(
            (task: any) => task.isCompleted
          );
        });
      });
    }
  }

  apiUrl = 'http://localhost:3000/tasks';
  headersList = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  tasksUncompleted = [];
  tasksCompleted = [];

  onRefresh() {
    fetch(this.apiUrl, {
      method: 'GET',
      headers: this.headersList,
    }).then((result) => {
      result.json().then((json) => {
        this.tasksCompleted = json.tasks.filter(
          (task: any) => !task.isCompleted
        );
        this.tasksUncompleted = json.tasks.filter(
          (task: any) => task.isCompleted
        );
      });
    });
  }
}
