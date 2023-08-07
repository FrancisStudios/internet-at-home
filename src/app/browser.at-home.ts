import { Component, HostListener } from '@angular/core';

const __componentPrefix = './browser.at-home';

@Component({
  selector: 'browser-at-home',
  templateUrl: `${__componentPrefix}.html`,
  styleUrls: [`${__componentPrefix}.css`]
})
export class BrowserAtHomeComponent {
  title = 'internet-at-home';
  isAppsMenuEnabled: boolean = false;

  /* TOGGLES APP LAUCNHER CONTEXT MENU */
  toggleAppsMenu(){ 
    if(!this.isAppsMenuEnabled){
      this.isAppsMenuEnabled = true;
    } else if(this.isAppsMenuEnabled){
      this.isAppsMenuEnabled = false;
    }
  }

  /* SHOULD CLOSE CONTEXT IF USER IS CLICKED AWAY*/
  @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
      if((event.target as HTMLImageElement).id !== "appsMenuToggler" && this.isAppsMenuEnabled === true) this.toggleAppsMenu();
    }
}
