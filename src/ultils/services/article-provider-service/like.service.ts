import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';

@Injectable({
    providedIn: 'root'
})
export class DuegevArticleLikeService {
    headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    constructor(private httpClient: HttpClient) { }

    giveLike(searchquery: { username: string, password: string, article_id: string }, calledFromRemove: boolean = false): Observable<any> {
        const perpare_payload: LikeQueryType = {
            query: {
                credentials: {
                    username: searchquery.username,
                    password: searchquery.password
                },
                action: calledFromRemove ? 'remove' : 'add',
                article_id: searchquery.article_id
            }
        }
        const payload = JSON.stringify(perpare_payload);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/article-like`, payload, { headers: this.headers });
    }

    removeLike(searchquery: { username: string, password: string, article_id: string }): Observable<any> {
        return this.giveLike(searchquery, true);
    }
}

export type LikeQueryType = {
    query: {
        credentials: {
            username: string,
            password: string,
        }
        action: 'add' | 'remove';
        article_id: string
    }
}

