import { Component } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { LanguageOptions } from 'src/data-types/identity-provider/language-options';

@Component({
  selector: 'account-settings-viewer',
  templateUrl: './account-settings-viewer.component.html',
  styleUrls: ['./account-settings-viewer.component.css']
})
export class AccountSettingsViewerComponent {
  user: UserData = <UserData>JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');
  languages: LanguageOptions[] = [LanguageOptions.ENGLISH, LanguageOptions.DYNARI];

  getLanguageOptions(language_referrer: string): string {
    switch(language_referrer){
      case LanguageOptions.DYNARI:
        return 'Dynari';
      
      case LanguageOptions.ENGLISH:
        return 'English';

      default:
        return 'No preference';
    }
  } 
}
