import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherLogIn } from '@ng-icons/feather-icons';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent, NavLinkComponent,RouterLink],
  providers: [provideIcons({ featherLogIn })],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})  
export class NavComponent {}
