import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Itask from '../../interfaces/Itask';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {
    if (!this.userService.isLogin()) {
      this.router.navigate(['']);
    } else {
      fetch(`${this.apiUrl}/${this.id}`, {
        method: 'GET',
        headers: this.headersList,
      }).then((result) => {
        if (result.status == 404) {
          router.navigate(['list']);
        } else {
          result.json().then((json) => {
            this.task = json.task;
            this.isChecked = this.task.isCompleted ?? false;
          });
        }
      });
    }
  }
  headersList = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  id = this.route.snapshot.params['id'];
  apiUrl = 'http://localhost:3000/tasks';
  isChecked: boolean = false;
  task: Itask = {};
  completedChange(change: boolean) {
    this.taskService.edit(this.id, { isCompleted: change });
  }
}
