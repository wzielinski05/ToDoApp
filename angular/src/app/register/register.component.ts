import { Component } from '@angular/core';
import { NavLinkComponent } from '../nav/nav-link/nav-link.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavLinkComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
