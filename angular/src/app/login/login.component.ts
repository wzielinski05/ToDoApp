import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav/nav-link/nav-link.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavLinkComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  email = new FormControl('');
  password = new FormControl('');

  login() {
    this.userService.login(this.email, this.password);
  }
}
