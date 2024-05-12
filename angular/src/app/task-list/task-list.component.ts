import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TaskListRowComponent } from './task-list-row/task-list-row.component';
import { LocalStorageService } from '../local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskListRowComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  constructor(
    public localStorage: LocalStorageService,
    private userService: UserService,
    private router: Router
  ) {
    if (!this.userService.isLogin()) {
      this.router.navigate(['']);
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
    Authorization: `Bearer ${this.localStorage.getItem('token')}`,
  };

  tasksUncompleted = [];
  tasksCompleted = [];

  onRefresh() {
    fetch(this.apiUrl, {
      method: 'GET',
      headers: this.headersList,
    }).then((result) => {
      result.json().then((json) => {
        console.log(json);

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
