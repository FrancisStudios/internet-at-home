import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { VIEWPORTS } from 'src/data-types/duegev-wiki/viewports.enum';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { InternetAtHomeLanguageService } from 'src/ultils/services/language.service';

@Component({
  selector: 'app-duegev-home',
  templateUrl: './duegev-home.component.html',
  styleUrls: [
    './duegev-home.component.css',
  ]
})
export class DuegevHomeComponent implements OnInit, OnDestroy {
  VIEWPORTS = VIEWPORTS;
  viewPort: VIEWPORTS = VIEWPORTS.BROWSEVIEW;
  user_session: string = sessionStorage.getItem(SessionStorageItems.USER) || '';
  LoggedInUser: UserData = this.user_session ? JSON.parse(this.user_session) : '';
  currentTime: number = 0;

  timeProvider: any;

  constructor(
    private duegevTimeProvider: DuegevTimeProvider,
    private languageProvider: InternetAtHomeLanguageService
  ) { }

  ngOnInit(): void {
    this.timeProvider = this.duegevTimeProvider.getTime().subscribe(response => {
      if (response.queryValidation === 'valid') this.currentTime = response.values;
    });
  }

  ngOnDestroy(): void {
    if (this.timeProvider) this.timeProvider.unsubscribe();
  }

  get getCurrentTimeStamp(): string {
    return this.duegevTimeProvider.getTimeByCommonTime(this.currentTime);
  }

  changeViewPort(viewport: VIEWPORTS) {
    this.viewPort = viewport;
  }

  getString(RESOURCE_IDENTIFIER: string): string {
    return this.languageProvider.getString(RESOURCE_IDENTIFIER);
  }

  get isAccountView(): boolean {
    return (this.viewPort === VIEWPORTS.ACCOUNTVIEW);
  }

  get isBrowseView(): boolean {
    return (this.viewPort === VIEWPORTS.BROWSEVIEW);
  }

  get isHomeView(): boolean {
    return (this.viewPort === VIEWPORTS.HOMEVIEW);
  }

}
