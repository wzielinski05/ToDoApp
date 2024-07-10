import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import Itask from '../../interfaces/Itask';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent {
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
            this.name.setValue(this.task.name ?? '');
            this.body.setValue(this.task.body ?? '');
            this.isCompleted.setValue(this.task.isCompleted ?? false);
          });
        }
      });
    }
  }
  name = new FormControl('');
  body = new FormControl('');
  isCompleted = new FormControl(false);
  headersList = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  id = this.route.snapshot.params['id'];
  apiUrl = 'http://localhost:3000/tasks';
  task: Itask = { name: '', body: '', isCompleted: false };

  save() {
    this.taskService.edit(
      this.id,
      {
        name: this.name.value ?? '',
        body: this.body.value ?? '',
        isCompleted: this.isCompleted.value ?? false,
      },
      true
    );
  }
}
