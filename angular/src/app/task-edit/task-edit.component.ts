import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { TaskService } from '../task.service';
import Itask from '../Itask';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

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
    private localStorage: LocalStorageService,
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
        result.json().then((json) => {
          this.task = json.task;
          this.name.setValue(this.task.name ?? '');
          this.body.setValue(this.task.body ?? '');
          this.isCompleted.setValue(this.task.isCompleted ?? false);
          console.log(json);
        });
      });
    }
  }
  name = new FormControl('');
  body = new FormControl('');
  isCompleted = new FormControl(false);
  headersList = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: `Bearer ${this.localStorage.getItem('token')}`,
  };
  id = this.route.snapshot.params['id'];
  apiUrl = 'http://localhost:3000/tasks';
  task: Itask = { name: '', body: '', isCompleted: false };

  save() {
    console.log(this.name.value, this.body.value, this.isCompleted.value);
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
