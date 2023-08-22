import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';

@Injectable({
    providedIn: 'root'
})
export class WikiArticleService {
    headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    constructor(private httpClient: HttpClient) { }

    getArticles(searchquery: ArticleSearchQueryType): Observable<any> {
        const payload = JSON.stringify(searchquery);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/article`, payload, { headers: this.headers });
    }

    getArticleByID(article_id: string): Observable<any> {
        const _query: ArticleSearchQueryType = { query: 'get-article-by-id', values: article_id };
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/article`, _query, { headers: this.headers });
    }

    getLatest(): Observable<any> {
        return this.getArticles({ query: 'get-latest' });
    }

    insertNewArticle(searchquery: ArticleSearchQueryType): Observable<any> {
        return this.getArticles(searchquery);
    }
}

export type ArticleSearchQueryType = {
    query: string,
    values?: WikiArticle | string
}

