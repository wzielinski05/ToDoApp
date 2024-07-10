import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: TaskListComponent },
  { path: 'create', component: CreateTaskComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'task/edit/:id', component: TaskEditComponent },
  { path: '', component: MainComponent },
];
