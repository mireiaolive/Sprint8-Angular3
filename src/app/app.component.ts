import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../app/_services/account.service';
import { User } from '../app/_models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user?: User | null;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.accountService.logout();
  }

  selectedLink: string = '';

  selectLink(link: string) {
    this.selectedLink = link;
  }
}
