import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task', component: TaskComponent },
];
