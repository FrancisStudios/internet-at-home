import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from 'src/data-types/authentication/user-data';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';
import { DuegevSearchEngine } from 'src/ultils/services/duegev-wiki-proprietary/duegev-search-engine.service';

@Component({
  selector: 'duegev-article-recycler-item',
  templateUrl: './duegev-article-recycler-item.component.html',
  styleUrls: ['./duegev-article-recycler-item.component.css']
})
export class DuegevArticleRecyclerItemComponent implements OnInit, OnDestroy {

  @Input() isMyArticles: boolean | null = null

  allArticles: WikiArticle[] = [];
  numberOfResults: number = 0;

  UIDDictionary: any[] = [];

  articleQuerySubscription: any;
  searchEngineSubscription: any;
  getUserByServiceGetAllUsersSubscription: any;

  constructor(
    private duegevArticleService: WikiArticleService,
    private duegevSearchEngine: DuegevSearchEngine,
    private getUserByService: GetUserByService
  ) { }

  ngOnInit(): void {

    let targetArticles: 'my' | 'all';
    this.isMyArticles === true ? targetArticles = 'my' : targetArticles = 'all';

    this.articleQuerySubscription = this.getTargetArticles(targetArticles).subscribe(response => {
      if (response.queryValidation === 'valid') this.allArticles = response.articles;
      this.numberOfResults = response.articles.length;
    });

    this.getUserByServiceGetAllUsersSubscription = this.getUserByService.getAllUsers().subscribe(usersList => {
      if (usersList.queryValidation && usersList.queryValidation === 'valid') {
        let _uList: UserData[] = JSON.parse(JSON.stringify(usersList.user));
        _uList.forEach(user => {
          this.UIDDictionary.push({
            UID: user.uid,
            nickname: user.nickname,
            prefix: user.prefix
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.articleQuerySubscription) this.articleQuerySubscription.unsubscribe();
    if (this.getUserByServiceGetAllUsersSubscription) this.getUserByServiceGetAllUsersSubscription.unsubscribe();
  }

  getTargetArticles(subQuery: 'all' | 'my'): Observable<any> {
    switch (subQuery) {
      case 'all':
        return this.duegevArticleService.getArticles({ query: '*' });

      case 'my':
        return this.duegevArticleService.getByUID();
    }
  }

  getNicknameByUID(UID: string | number): string {
    UID = Number(UID);
    let selectedUser = this.UIDDictionary.filter(dictionaryLine => {
      return dictionaryLine.UID === UID;
    });
    return selectedUser[0]?.nickname;
  }

  search() {
    let SearchSelector: HTMLInputElement;
    this.isMyArticles
      ? SearchSelector = <HTMLInputElement>document.getElementById('my_articles_search')
      : SearchSelector = <HTMLInputElement>document.getElementById('all_articles_search');
    let searchQuery = SearchSelector.value;

    if (searchQuery && searchQuery !== '') {
      this.searchEngineSubscription = this.duegevSearchEngine.search(searchQuery).subscribe(response => {
        if (response.queryValidation === 'valid') this.allArticles = response.values;
        this.numberOfResults = response.values.length;
      });
    } else {
      let allSearchQuery = JSON.stringify({ query: '*' });
      this.searchEngineSubscription = this.duegevSearchEngine.search(allSearchQuery).subscribe(response => {
        this.ngOnInit();
      });
    }
  }

  deleteArticle() {

  }

  editArticle() {

  }
}
