import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  testContent: any;
  headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

  constructor(private httpClient: HttpClient) { }

  authenticateUser(username: string, password: string): Observable<any> {
    const payload = JSON.stringify({ query: 'login', values: { username: username, password: password } });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  changeUserPreferences(user: UserData): Observable<any> {
    const payload = JSON.stringify({ query: 'change-preferences', values: { ...user } });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  changeUserName(oldUsername: string, newUsername: string, password: string): Observable<any> {
    const payload = JSON.stringify({ query: 'change-username', values: { oldUsername: oldUsername, newUsername: newUsername, password: password } });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const payload = JSON.stringify({ query: 'change-password', values: { username: username, oldPassword: oldPassword, newPassword: newPassword } });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  createUserSession(UserProfileData: UserData) {
    sessionStorage.setItem(SessionStorageItems.USER, JSON.stringify(UserProfileData));
  }

  getTruncatedUserData(): Observable<any> {
    let loggedInUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) as string);

    let payload = JSON.stringify({ query: 'get-truncated-ud', values: { username: loggedInUser.username, password: loggedInUser.password } });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  testService() {
    this.httpClient.get('http://localhost:3000/', { responseType: 'text' }).subscribe((response) => {
      console.log(response)
    });
  }
}

export type AuthenticationQueryValidationType = { queryValidation: 'valid' | 'invalid' };
