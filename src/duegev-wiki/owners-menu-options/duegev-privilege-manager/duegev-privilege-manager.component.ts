import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { AuthenticationService } from 'src/ultils/services/authentication-service/authentication.service';
import { DuegevAccountPrivileges, DuegevPrivilegeProviderService } from 'src/ultils/services/authentication-service/privileges-provider.service';
import config from 'src/duegev-config';

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
  createNewUserSubscription: any;

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
    if (this.createNewUserSubscription) this.createNewUserSubscription.unsubscribe();
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
    if (!this.allTruncatedUsers.map((tu: { username: string; }) => tu.username).includes(this.createdNewUser.username)) {
      if (
        (this.createdNewUser.password === this.createdNewUserConfirm.newUserPassword) &&
        (this.createdNewUserConfirm.initiatorPassWord === this.localUser.password)
      ) {
        this.createNewUserSubscription = this.identityProvider
          .createNewAuthentication(
            this.createdNewUser.username,
            this.createdNewUser.password,
            this.localUser.username,
            this.createdNewUserConfirm.initiatorPassWord
          )
          .subscribe(response => {
            if (response.queryValidation === 'valid') {
              window.alert('User succesfully created');
              location.reload();
            } else window.alert('ERROR: could not create new user due to technical issues!');
          });
      } else window.alert('Passwords does not match up!')
    } else window.alert('Username already exists!');
  }

  askForConfirmationPanel() {
    this.isConfirmUserCreation = true;
  }

  updateMapData(): void {
    /* TODO GET MAP DATA AND ENABLE MAP UPDATE CONFIRMATION PANEL */
    const fileUploader: any = (<HTMLInputElement>document.getElementById('map-file-upload')) || { files: [{ name: '%notnull%' }] };
    const fileName = (fileUploader?.files[0]?.name ? fileUploader.files[0].name : '%notnull%');
    const file = (fileUploader?.files[0]);
    const validFileFormats = config.supportedMapFileFormats;
    const fileConditions: boolean = (
      fileName &&
      fileName !== '%notnull%' &&
      fileName.length > 1 &&
      (validFileFormats.includes(fileName.split('.')[fileName.split('.').length - 1]))
    );

    if (fileConditions) {
      /* SAVE FILE TO LOCAL DIR */
      const __fileReferecne = new File([file], 'duegev-map', { type: file.type });
      const __fileReader = new FileReader();

      __fileReader.readAsDataURL(__fileReferecne);
      __fileReader.addEventListener('load', () => {
        const __result = __fileReader.result?.toString() || '';
        const regex = /^data:.+\/(.+);base64,(.*)$/;

        let matches: any = __result.match(regex);
        let extension = matches[1];
        let data = matches[2];

        //fse.writeFileSync('data.' + extension, data);
      });

    } else {
      if (!validFileFormats.includes(fileName.split('.')[fileName.split('.').length - 1]))
        window.alert(`${fileName.split('.')[fileName.split('.').length - 1]} format is not supported`);
    }
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