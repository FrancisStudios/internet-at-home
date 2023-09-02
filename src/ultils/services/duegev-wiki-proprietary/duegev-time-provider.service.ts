import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';

@Injectable({
    providedIn: 'root'
})
export class DuegevTimeProvider {
    headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    constructor(private httpClient: HttpClient) { }

    getTime(): Observable<any> {
        const queryObject: TimeSetSearchQueryType = { query: 'get' };
        const payload = JSON.stringify(queryObject);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/duegev-time`, payload, { headers: this.headers });
    }

    getIRLTime() : string {
        let nilDate: Date = new Date();
        return `${nilDate.getFullYear()}.${nilDate.getMonth() + 1}.${nilDate.getDate()}`;
    }

    setTime(): Observable<any> {
        let nilDate: Date = new Date();
        let activeUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');
        let currentDate = `${nilDate.getFullYear()}.${nilDate.getMonth() + 1}.${nilDate.getDate()}`;
        
        const queryObject: TimeSetSearchQueryType = { query: 'set', values: { uid: activeUser.uid, password: activeUser.password, date: currentDate } };
        const payload = JSON.stringify(queryObject);

        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/duegev-time`, payload, { headers: this.headers });
    }

    getTimeByCommonTime(commonTime: number): string {
        const timestamp = `K.i. ${commonTime} | Cl.u. ${commonTime - 2042} | Ersi idő ${commonTime - 1910} | Nordi idő ${commonTime - 1891} | Sz.I ${commonTime - 1503}`;
        return timestamp;
    }
}

export type ArticleSearchQueryType = {
    query: string
}

export type TimeSetSearchQueryType = {
    query: 'get' | 'set',
    values?: {
        uid: number,
        password: string,
        date: string,
    }
}

