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
        const queryObject = {query: "getUserBy", value: `uid='${UID}'`};
        const payload = JSON.stringify(queryObject);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/userop`, payload, { headers: this.headers });
    }
}

export type ArticleSearchQueryType = {
    query: string
}

