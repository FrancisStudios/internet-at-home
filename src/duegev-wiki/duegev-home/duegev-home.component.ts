import { Component, OnInit } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { VIEWPORTS } from 'src/data-types/duegev-wiki/viewports.enum';

@Component({
  selector: 'app-duegev-home',
  templateUrl: './duegev-home.component.html',
  styleUrls: [
    './duegev-home.component.css',
  ]
})
export class DuegevHomeComponent {
  VIEWPORTS = VIEWPORTS;
  viewPort: VIEWPORTS = VIEWPORTS.BROWSEVIEW;
  user_session : string = sessionStorage.getItem(SessionStorageItems.USER) || '';
  LoggedInUser : UserData = JSON.parse(this.user_session);

  ngOnInit(): void {
    
  }

  changeViewPort(viewport: VIEWPORTS){
    this.viewPort = viewport;
  }

  get isAccountView(): boolean {
    return (this.viewPort === VIEWPORTS.ACCOUNTVIEW);
  }

  get isBrowseView(): boolean {
    return (this.viewPort === VIEWPORTS.BROWSEVIEW);
  }

}
