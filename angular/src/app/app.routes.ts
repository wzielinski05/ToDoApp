import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: TaskListComponent },
  { path: 'create', component: CreateTaskComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'task/edit/:id', component: TaskEditComponent },
  { path: '', component: MainComponent },
];
