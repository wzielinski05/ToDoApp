import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private userSevice: UserService) {}
  isLogin = this.userSevice.isLogin();
}
