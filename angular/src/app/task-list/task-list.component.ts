import { Component } from '@angular/core';
import { TaskListRowComponent } from './task-list-row/task-list-row.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskListRowComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

}
