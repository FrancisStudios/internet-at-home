import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { InternetAtHomeLanguageService } from 'src/ultils/services/language.service';

@Component({
  selector: 'duegev-account',
  templateUrl: './duegev-account.component.html',
  styleUrls: ['./duegev-account.component.css'],
})
export class DuegevAccountComponent implements OnInit, OnDestroy {
  activeMenu: MenuItems = MenuItems.ACCOUNT;
  MenuItems = MenuItems;
  loggedInUser: UserData | any;
  isCreativeMenuEnabled: boolean = false;

  timeProviderSubscription: any;

  constructor(
    private duegevTimeProvider: DuegevTimeProvider,
    private languageProvider: InternetAtHomeLanguageService
    ) { }

  ngOnInit(): void {
    this.loggedInUser = this.getLoggedInUser;
  }

  ngOnDestroy(): void {
    if (this.timeProviderSubscription) this.timeProviderSubscription.unsubscribe();
  }

  newYearControl() {
    this.timeProviderSubscription = this.duegevTimeProvider.setTime().subscribe(response => {
      if (response.queryValidation === 'valid') {
        window.alert('New date set!');
      } else window.alert('Failed to set date!');
    });
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
      case _mItem = MenuItems.SOCIAL:
        this.activeMenu = MenuItems.SOCIAL
        break;
    }
  }

  get getLoggedInUser() {
    const linus = sessionStorage.getItem(SessionStorageItems.USER);
    if (linus) return JSON.parse(linus);
  }

  enableCreativeMenu() {
    this.activeMenu = MenuItems.CREATIVE;
  }

  getString(RESOURCE_IDENTIFIER: string): string {
    return this.languageProvider.getString(RESOURCE_IDENTIFIER);
  }
}

enum MenuItems {
  ACCOUNT = 'account',
  PRIVILEGES = 'privileges',
  ARTICLES = 'articles',
  SOCIAL = 'social',
  CREATIVE = 'creative'
}
