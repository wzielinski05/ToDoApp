import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav/nav-link/nav-link.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavLinkComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
