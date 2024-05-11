import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherCheck, featherCircle, featherEdit, featherTrash2 } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-task-list-row',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({featherEdit,featherCheck,featherCircle,featherTrash2})],
  templateUrl: './task-list-row.component.html',
  styleUrl: './task-list-row.component.css',
})
export class TaskListRowComponent {
  @Input() title: string = '';
  @Input() id: string = ''; 
}
