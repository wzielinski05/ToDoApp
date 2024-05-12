import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherLogIn } from '@ng-icons/feather-icons';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent, NavLinkComponent, RouterLink],
  providers: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(
    public localStorage: LocalStorageService,
    private userService: UserService
  ) {}


  signout() {
    this.userService.signout();
  }
}
