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

  userPreferencesControl() {

  }

  changeUsernameControl() {
    let newUsername = (<HTMLInputElement>document.getElementById('ch-username-field')).value;
    let pwConfirmation = (<HTMLInputElement>document.getElementById('ch-username-password')).value;

    if ((newUsername && newUsername !== '') && (pwConfirmation && pwConfirmation !== '')) {
      this.changeUsernameSubscription = this.UNICUMIdentityProvider.changeUserName(this.user.username, newUsername, pwConfirmation).subscribe(response => {
        if (response.queryValidation === 'valid') {
          /* SUCCESSFUL UNAME CHANGE */
          let LocalUserObject: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');
          LocalUserObject.username = newUsername;
          sessionStorage.setItem(SessionStorageItems.USER, JSON.stringify(LocalUserObject));
          window.alert('Your username successfully changed. Use your new username at your next login!');
          (<HTMLInputElement>document.getElementById('ch-username-field')).value = '';
          (<HTMLInputElement>document.getElementById('ch-username-password')).value = '';
        } else {
          /* UNAME CHANGE FAILED */
          window.alert('Username change failed!');
        }
      });
    } else {
      /* PLEASE FILL ALL FIELDS */
      window.alert('Please fill all fields before submitting!');
    }
  }

  changePasswordControl() {
    let oldPassword = (<HTMLInputElement>document.getElementById('ch-password-old-control')).value;
    let newPassword = (<HTMLInputElement>document.getElementById('ch-password-new-1-control')).value;
    let newPassword_confirm = (<HTMLInputElement>document.getElementById('ch-password-new-2-control')).value;

    let LocalUserObject: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');

    if (newPassword.length > 5 && newPassword_confirm.length > 5) {
      if (newPassword === newPassword_confirm) {
        if (oldPassword !== '') {
          this.UNICUMIdentityProvider.changePassword(LocalUserObject.username, oldPassword, newPassword).subscribe(dbResponse => {
            if (dbResponse.queryValidation === 'valid') {
              window.alert('Password successfully changed!');
              LocalUserObject.password = newPassword;
              sessionStorage.setItem(SessionStorageItems.USER, JSON.stringify(LocalUserObject));
            } else if (dbResponse.queryValidation === 'invalid') {
              window.alert('Password change failed!');
            }

            (<HTMLInputElement>document.getElementById('ch-password-old-control')).value = '';
            (<HTMLInputElement>document.getElementById('ch-password-new-1-control')).value = '';
            (<HTMLInputElement>document.getElementById('ch-password-new-2-control')).value = '';
          });
        } else window.alert('Old password is required!');
      } else window.alert('New password and confirm does not match!');
    } else window.alert('Password must be at least 6 characters!');
  }
}
