import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';

@Injectable({
    providedIn: 'root'
})
export class DuegevTimeProvider {
    headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    constructor(private httpClient: HttpClient) { }

    getTime(): Observable<any> {
        const queryObject = { query: 'recent' };
        const payload = JSON.stringify(queryObject);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/duegev/time`, payload, { headers: this.headers });
    }

    getTimeByCommonTime(commonTime: number): string {
        const timestamp = `K.i. ${commonTime} | Cl.u. ${commonTime - 2042} | Ersi idő ${commonTime - 1910} | Nordi idő ${commonTime - 1891} | Sz.I ${commonTime - 1503}`;
        return timestamp;
    }
}

export type ArticleSearchQueryType = {
    query: string
}

