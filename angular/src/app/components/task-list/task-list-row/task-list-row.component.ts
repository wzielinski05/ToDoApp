import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherCheckCircle,
  featherCircle,
  featherEdit,
  featherTrash2,
} from '@ng-icons/feather-icons';
import Itask from '../../../interfaces/Itask';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-list-row',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  viewProviders: [
    provideIcons({
      featherEdit,
      featherCheckCircle,
      featherCircle,
      featherTrash2,
    }),
  ],
  templateUrl: './task-list-row.component.html',
  styleUrl: './task-list-row.component.css',
})
export class TaskListRowComponent {
  constructor(private router: Router, private taskService: TaskService) {}
  @Input() task: Itask = { name: '', body: '', isCompleted: false };
  @Output() refresh = new EventEmitter();

  changeStatus() {
    this.taskService
      .edit(this.task._id ?? '', {
        isCompleted: !this.task.isCompleted,
      })
      .then(() => {
        this.refresh.emit();
      });
  }
  deleteTask() {
    this.taskService.delete(this.task._id ?? '').then(() => {
      this.refresh.emit();
    });
  }
}
