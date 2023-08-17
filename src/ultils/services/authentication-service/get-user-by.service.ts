import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';

@Injectable({
    providedIn: 'root'
})
export class GetUserByService {
    headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    constructor(private httpClient: HttpClient) { }

    getUserByUID(UID: number): Observable<any> {
        const queryObject = { query: "getUserBy", value: `uid='${UID}'` };
        const payload = JSON.stringify(queryObject);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/user-ops`, payload, { headers: this.headers });
    }

    getAllUsers(): Observable<any> {
        const queryObject = { query: "getAllUsers" };
        const payload = JSON.stringify(queryObject);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/user-ops`, payload, { headers: this.headers });
    }

    testService() {
        this.httpClient.post('http://localhost:3000/user-ops', '{}', { headers: new HttpHeaders({ 'Content-Type': 'application/JSON' }) }).subscribe((response) => {
            console.log(response)
            return response;
        });
    }
}

export type ArticleSearchQueryType = {
    query: string
}

