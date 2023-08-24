import { Component, OnDestroy } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { LanguageOptions } from 'src/data-types/identity-provider/language-options';
import { AuthenticationService } from 'src/ultils/services/authentication-service/authentication.service';

@Component({
  selector: 'account-settings-viewer',
  templateUrl: './account-settings-viewer.component.html',
  styleUrls: ['./account-settings-viewer.component.css']
})
export class AccountSettingsViewerComponent implements OnDestroy {
  user: UserData = <UserData>JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');
  languages: LanguageOptions[] = [LanguageOptions.ENGLISH, LanguageOptions.DYNARI];
  changeUsernameSubscription: any;

  constructor(private UNICUMIdentityProvider: AuthenticationService) { }

  ngOnDestroy(): void {
    if (this.changeUsernameSubscription) this.changeUsernameSubscription.unsubscribe();
  }

  getLanguageOptions(language_referrer: string): string {
    switch (language_referrer) {
      case LanguageOptions.DYNARI:
        return 'Dynari';

      case LanguageOptions.ENGLISH:
        return 'English';

      default:
        return 'No preference';
    }
  }

  changeUsernameControl() {
    let newUsername = (<HTMLInputElement>document.getElementById('ch-username-field')).value;
    let pwConfirmation = (<HTMLInputElement>document.getElementById('ch-username-password')).value;

    if ((newUsername && newUsername !== '') && (pwConfirmation && pwConfirmation !== '')) {
      this.changeUsernameSubscription = this.UNICUMIdentityProvider.changeUserName(this.user.username, newUsername, pwConfirmation).subscribe(response => {
        if (response.queryValidation === 'valid') {
          /* SUCCESSFUL UNAME CHANGE */
        } else {
          /* UNAME CHANGE FAILED */
        }
      });
    } else {
      /* PLEASE FILL ALL FIELDS */
    }
  }
}
