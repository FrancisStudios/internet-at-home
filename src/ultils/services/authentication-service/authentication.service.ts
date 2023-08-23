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
    const payload = JSON.stringify({ username: username, password: password });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  changeUserName(oldUsername: string, newUsername: string, password: string): Observable<any> {
    const payload = JSON.stringify({ query: 'change', values: { oldUsername: oldUsername, newUsername: newUsername, password: password } });
    return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/login`, payload, { headers: this.headers });
  }

  createUserSession(UserProfileData: UserData) {
    sessionStorage.setItem(SessionStorageItems.USER, JSON.stringify(UserProfileData));
  }

  testService() {
    this.httpClient.get('http://localhost:3000/', { responseType: 'text' }).subscribe((response) => {
      console.log(response)
    });
  }
}

