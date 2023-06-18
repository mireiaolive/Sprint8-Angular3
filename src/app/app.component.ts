import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AccountService } from '../app/_services/account.service';
import { User } from '../app/_models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: User | null = null;
  selectedLink: string = '';
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificar si la ruta actual es la página de inicio de sesión
        this.isLoginPage = event.url.includes('/account/login');
        // Verificar si la ruta actual es la página de registro
        this.isRegisterPage = event.url.includes('/account/register');
      }
    });
  }

  logout() {
    this.accountService.logout();
  }

  selectLink(link: string) {
    this.selectedLink = link;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}
