import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { AuthenticationService } from 'src/ultils/services/authentication-service/authentication.service';
import { DuegevAccountPrivileges, DuegevPrivilegeProviderService } from 'src/ultils/services/authentication-service/privileges-provider.service';

@Component({
  selector: 'duegev-privilege-manager',
  templateUrl: './duegev-privilege-manager.component.html',
  styleUrls: ['./duegev-privilege-manager.component.css']
})
export class DuegevPrivilegeManagerComponent implements OnInit, OnDestroy {

  isChecked: boolean = false; //just test variable
  isConfirmUserCreation: boolean = false;

  allPrivilegesList = DuegevAccountPrivileges;
  allTruncatedUsers: TruncatedUserData[] | any;
  myPrivileges: string[] = [];
  userPrivileges: any;
  createdNewUser: GeneralCredentials = { username: '', password: '' };
  createdNewUserConfirm = { initiatorPassWord: '', newUserPassword: '' };

  localUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) as string);

  /* SUBSCRIPTIONS */
  getAllUsersSubscription: any;
  getMyPrivilegesSubscription: any;

  constructor(
    private identityProvider: AuthenticationService,
    private privilegeProdiver: DuegevPrivilegeProviderService
  ) { }

  ngOnInit(): void {
    this.getAllUsersSubscription = this.identityProvider.getTruncatedUserData().subscribe(response => {
      if (response.queryValidation === 'valid') this.allTruncatedUsers = response.values;
    });

    this.getMyPrivilegesSubscription = this.privilegeProdiver.getMyPrivileges().subscribe(response => {
      if (response && response.length > 0) this.myPrivileges = response;
    });
  }

  ngOnDestroy(): void {
    if (this.getAllUsersSubscription) this.getAllUsersSubscription.unsubscribe();
    if (this.getMyPrivilegesSubscription) this.getMyPrivilegesSubscription.unsubscribe();
  }

  includes(ROLE: string): boolean {
    return this.myPrivileges.includes(ROLE);
  }

  newUserCreatorInputs($event: any, target: 'username' | 'password') {
    switch (target) {
      case 'username':
        $event.data !== null
          ? this.createdNewUser.username += $event.data
          : this.createdNewUser.username = this.createdNewUser.username.slice(0, -1);
        break;

      case 'password':
        $event.data !== null
          ? this.createdNewUser.password += $event.data
          : this.createdNewUser.password = this.createdNewUser.password.slice(0, -1);
        break;
    }
  }

  newUserConfirmInputs($event: any, target: 'initiator' | 'target') {
    switch (target) {
      case 'initiator':
        $event.data !== null
          ? this.createdNewUserConfirm.initiatorPassWord += $event.data
          : this.createdNewUserConfirm.initiatorPassWord = this.createdNewUserConfirm.initiatorPassWord.slice(0, -1);
        break;

      case 'target':
        $event.data !== null
          ? this.createdNewUserConfirm.newUserPassword += $event.data
          : this.createdNewUserConfirm.newUserPassword = this.createdNewUserConfirm.newUserPassword.slice(0, -1);
        break;
    }
  }

  createNewUser() {
    if (this.allTruncatedUsers.map((tu: { username: string; }) => tu.username).includes(this.createdNewUser.username)) {
      if (
        (this.createdNewUser.password === this.createdNewUserConfirm.newUserPassword) &&
        (this.createdNewUserConfirm.initiatorPassWord === this.localUser.password)
      ) {
        /* TODO: Initiate saving user into db*/
      } else window.alert('Passwords does not match up!')
    } else window.alert('Username already exists!');
  }

  askForConfirmationPanel() {
    this.isConfirmUserCreation = true;
  }
}

export type TruncatedUserData = {
  username: string,
  prefix: string,
  nickname: string,
  uid: number,
  privileges: string[];
}

export type GeneralCredentials = {
  username: string,
  password: string,
}