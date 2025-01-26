import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('1s ease-in-out')]),
      transition(':leave', [animate('0.5s ease-out')]),
    ]),
    trigger('headerAnimation', [
      state(
        'default',
        style({
          transform: 'translateY(0)',
        })
      ),
      state(
        'scrolled',
        style({
          transform: 'translateY(-10px)',
        })
      ),
      transition('default <=> scrolled', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.isLoggedIn().subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  headerState = 'default';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.headerState = scrollPosition > 10 ? 'scrolled' : 'default';
  }
}
