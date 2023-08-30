import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebAPIConfig } from 'src/data-types/authentication/web-api.config';

@Injectable({
    providedIn: 'root'
})
export class DuegevSearchEngine {
    headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    constructor(private httpClient: HttpClient) { }

    private searchEngine(search: string): DuegevSearchQueryType {
        /*const search: string = 'some generic text &labels[label1, label2] &categories[category1, category2] &in:title=blablabla';*/
        let documentSearch: string = '';
        let labelsSearch: string[] = [];
        let categoriesSearch: string[] = [];
        let titleSearch: string = '';

        const resolveSorters = (sorter: 'label' | 'category', token: string): string[] => {

            let LABELS: string[] = [];
            let CATEGORIES: string[] = [];

            const resolveValues = (_sorterValues: string[]): string[] => {
                let _tokenSorterSearchValues: string[] = [];
                _sorterValues.forEach(labelValue => {
                    let sanitizedValue = labelValue.replace('[', '').replace(']', '').trim();
                    _tokenSorterSearchValues.push(sanitizedValue);
                });

                return _tokenSorterSearchValues;
            }

            switch (sorter) {
                case 'label':
                    let _tokenLabel = token.split('labels');
                    let _tokenLabelValues = _tokenLabel[1].split(',');
                    LABELS.push(...resolveValues(_tokenLabelValues));
                    break;

                case 'category':
                    let _tokenCategory = token.split('categories');
                    let _tokenCategoryValues = _tokenCategory[1].split(',');
                    CATEGORIES.push(...resolveValues(_tokenCategoryValues));
                    break;
            }

            return (sorter === 'label' ? LABELS : CATEGORIES);
        }

        let tokens = search.split('&');

        if (tokens.length > 1) {
            tokens.forEach(token => {
                if (token.includes('labels[')) labelsSearch.push(...resolveSorters('label', token));
                if (token.includes('categories[')) categoriesSearch.push(...resolveSorters('category', token));
                if (token.includes('in:title=')) titleSearch = token.split('in:title=')[1].trim();

                if (!token.includes('labels[') && !token.includes('categories[') && !token.includes('in:title=')) {
                    documentSearch = token.trim();
                }
            });
        } else {
            documentSearch = tokens[0].trim();
        }

        const values: DuegevSearchQueryType = {
            query: 'search',
            values: {
                labels: labelsSearch,
                categories: categoriesSearch,
                title: titleSearch,
                document: documentSearch,
            }
        }

        return values;
    }

    search(browseQuery: string): Observable<any> {
        const queryObject: DuegevSearchQueryType = this.searchEngine(browseQuery); const payload = JSON.stringify(queryObject);
        return this.httpClient.post(`${WebAPIConfig.URI}:${WebAPIConfig.PORT}/duegev-search`, payload, { headers: this.headers });
    }
}


export type DuegevSearchQueryType = {
    query: string;
    values: {
        labels: string[],
        categories: string[],
        title: string,
        document: string,
    }
}