import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/ultils/services/authentication-service/authentication.service';
import { DuegevAccountPrivileges, DuegevPrivilegeProviderService } from 'src/ultils/services/authentication-service/privileges-provider.service';

@Component({
  selector: 'duegev-privilege-manager',
  templateUrl: './duegev-privilege-manager.component.html',
  styleUrls: ['./duegev-privilege-manager.component.css']
})
export class DuegevPrivilegeManagerComponent implements OnInit, OnDestroy {

  isChecked: boolean = false; //just test variable

  allPrivilegesList = DuegevAccountPrivileges;
  allTruncatedUsers: TruncatedUserData[] | any;
  myPrivileges: string[] = [];
  userPrivileges: any;

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
}

export type TruncatedUserData = {
  username: string,
  prefix: string,
  nickname: string,
  uid: number,
  privileges: string[];
}