import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { UserData } from 'src/data-types/authentication/user-data';

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css']
})
export class IdentityProviderComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { }

  isLogin = false;
  isVerfiying = true;
  isVerified = false;
  isFailed = false;
  isChangeCredentials = false;
  dispatchedFrom: string = '';
  private routeSubscription: any;

  _fieldUsername: string = '';
  _fieldPassword: string = '';

  gDispatchedFrom: string = '';

  linuser: UserData | any;

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.dispatchedFrom = params['from'];
      this.gDispatchedFrom = this.dispatchedFrom;
    });
    this.autoAuthenticateUser();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  /* Normal authentication with manual input */
  authenticateCredentials() {
    this._fieldUsername = (<HTMLInputElement>document.getElementById('identity-provider-username')).value;
    this._fieldPassword = (<HTMLInputElement>document.getElementById('identity-provider-password')).value;

    if (this._fieldPassword !== '' && this._fieldUsername !== '') {
      this.auth.authenticateUser(this._fieldUsername, this._fieldPassword).subscribe(response => {
        this.isLogin = false; this.isVerfiying = true;
        if (response.authentication === 'verified') {
          this.isLogin = false; this.isVerfiying = false; this.isVerified = true;
          this.auth.createUserSession(response.user);
          this.redirectToSender();
        } else {
          this.isLogin = false; this.isVerfiying = false; this.isVerified = false; this.isFailed = true;
        }
      });
    }
  }

  /* Auto authenticate from session storage + backend */
  autoAuthenticateUser() {
    const USER = sessionStorage.getItem(SessionStorageItems.USER);

    if (USER) {
      let UserObject: UserData = JSON.parse(USER);
      if (UserObject.username && UserObject.password) {
        this.auth.authenticateUser(UserObject.username, UserObject.password).subscribe(r => {
          this.isLogin = false; this.isVerfiying = true;
          if (r.authentication === 'verified') {
            this.isLogin = false; this.isVerfiying = false; this.isVerified = true;
            this.redirectToSender();
          } else {
            this.isLogin = false; this.isVerfiying = false; this.isVerified = false; this.isFailed = true;
          }
        })
      } else { this.isLogin = true; this.isVerfiying = false; }
    } else {
      this.isLogin = true;
      this.isVerfiying = false;
    }
  }

  backToLogin() {
    this.isLogin = true;
    this.isVerfiying = false;
    this.isVerified = false;
    this.isFailed = false;
  }

  /* If you direct */
  redirectToSender() {
    if (this.gDispatchedFrom === '') return;
    switch (this.gDispatchedFrom) {
      case 'duegev-wiki':
        if (this.isVerified) this.router.navigate(['/duegev-wiki']);
        break;
    }
  }
}
