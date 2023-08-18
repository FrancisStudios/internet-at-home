import { Component, OnInit } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';

@Component({
  selector: 'duegev-account',
  templateUrl: './duegev-account.component.html',
  styleUrls: ['./duegev-account.component.css'],
})
export class DuegevAccountComponent implements OnInit {
  activeMenu: MenuItems = MenuItems.ACCOUNT;
  MenuItems = MenuItems;
  loggedInUser: UserData | any;
  isCreativeMenuEnabled: boolean = false;

  constructor(){}

  ngOnInit(): void {
    this.loggedInUser = this.getLoggedInUser;
  }

  menuClicked(_mItem: MenuItems) {
    switch (_mItem) {
      case _mItem = MenuItems.ACCOUNT:
        this.activeMenu = MenuItems.ACCOUNT;
        break;
      case _mItem = MenuItems.PRIVILEGES:
        this.activeMenu = MenuItems.PRIVILEGES;
        break;
      case _mItem = MenuItems.ARTICLES:
        this.activeMenu = MenuItems.ARTICLES;
        break;
      case _mItem = MenuItems.SORTING:
        this.activeMenu = MenuItems.SORTING
        break;
    }
  }

  get getLoggedInUser () {
    const linus = sessionStorage.getItem(SessionStorageItems.USER);
    if(linus) return JSON.parse(linus);
  }

  enableCreativeMenu(){
    this.isCreativeMenuEnabled = !this.isCreativeMenuEnabled;
  }
}

enum MenuItems {
  ACCOUNT = 'account',
  PRIVILEGES = 'privileges',
  ARTICLES = 'articles',
  SORTING = 'sorting'
}
