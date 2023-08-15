import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'duegev-account',
  templateUrl: './duegev-account.component.html',
  styleUrls: ['./duegev-account.component.css'],
})
export class DuegevAccountComponent implements OnInit {
  activeMenu: MenuItems = MenuItems.ACCOUNT;
  MenuItems = MenuItems;
  constructor(){}

  ngOnInit(): void {
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
}

enum MenuItems {
  ACCOUNT = 'account',
  PRIVILEGES = 'privileges',
  ARTICLES = 'articles',
  SORTING = 'sorting'
}
