import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';
import { CustomChipType } from 'src/ultils/custom-ui/custom-chip-list/custom-chip-list.component';
import { DuegevArticleLikeService } from 'src/ultils/services/article-provider-service/like.service';
import { ArticleSearchQueryType, WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';
import { DuegevSearchEngine } from 'src/ultils/services/duegev-wiki-proprietary/duegev-search-engine.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { InternetAtHomeLanguageService } from 'src/ultils/services/language.service';

@Component({
  selector: 'duegev-browse',
  templateUrl: './duegev-browse.component.html',
  styleUrls: ['./duegev-browse.component.css']
})
export class DuegevBrowseComponent implements OnInit, OnDestroy {
  searchquery: ArticleSearchQueryType = { query: '*' };
  articles: any | WikiArticle[] = '';
  UIDDictionary: any[] = [];

  numberOfSearchResults: number = 0;

  private articleServiceGetArticlesSubscription: any;
  private getUserByServiceGetAllUsersSubscription: any;
  private duegevSearchEngineSubscription: any;

  constructor(
    private articleService: WikiArticleService,
    private timeProvider: DuegevTimeProvider,
    private getUserByService: GetUserByService,
    private dialogProvider: MatDialog,
    private likeService: DuegevArticleLikeService,
    private duegevSearchEngine: DuegevSearchEngine,
    private languageProvider: InternetAtHomeLanguageService,
    private changeDetectorReference: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.articleServiceGetArticlesSubscription = this.articleService.getArticles(this.searchquery).subscribe(response => {
      if (response.queryValidation && response.queryValidation === 'valid') {
        this.articles = response.articles;
        this.numberOfSearchResults = response.articles.length;
      }
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
    if (this.articleServiceGetArticlesSubscription) this.articleServiceGetArticlesSubscription.unsubscribe();
    if (this.getUserByServiceGetAllUsersSubscription) this.getUserByServiceGetAllUsersSubscription.unsubscribe();
    if (this.duegevSearchEngineSubscription) this.duegevSearchEngineSubscription.unsubscribe();
  }

  getTimeByCT(commonTime: number | string): string {
    if (typeof commonTime === 'string') commonTime = Number(commonTime);
    return this.timeProvider.getTimeByCommonTime(commonTime);
  }

  mapLabelsToChips(labels: string[] | string, color: string): CustomChipType[] {
    if (!Array.isArray(labels)) labels = JSON.parse(labels) as string[];
    return labels.map((label) => {
      return { text: label, color: color };
    });
  }

  copyPermalinkToClipboard(articleLink: string) {
    navigator.clipboard.writeText(`/article-viewer/${articleLink}`);
  }

  getNumberOfLikes(likers: string[] | string) {
    if (!Array.isArray(likers)) likers = JSON.parse(likers) as string[];
    return likers.length;
  }

  getNicknameByUID(UID: string | number): string {
    UID = Number(UID);
    let selectedUser = this.UIDDictionary.filter(dictionaryLine => {
      return dictionaryLine.UID === UID;
    });
    return selectedUser[0]?.nickname;
  }

  like(article_id: string, likesArray: any[]): void {
    if (!Array.isArray(likesArray)) likesArray = JSON.parse(likesArray) as number[];

    if (sessionStorage.getItem(SessionStorageItems.USER)) {
      let linuser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');
      if (linuser.username && linuser.password) {

        const requestObject = {
          username: linuser.username,
          password: linuser.password,
          article_id: article_id
        }

        likesArray = likesArray.map(e => Number(e));

        if (likesArray.includes(linuser.uid)) {
          /* REMOVE ONE LIKE */
          this.likeService.removeLike(requestObject).subscribe(res => {
            this.ngOnInit();
          });
        } else {
          /* ADD ONE LIKE */
          this.likeService.giveLike(requestObject).subscribe(res => {
            this.ngOnInit();
          });
        }

      } else this.dialogProvider.open(LoginIsNeededDialog);
    } else this.dialogProvider.open(LoginIsNeededDialog);
  }

  search() {
    let searchExpression: string = (<HTMLInputElement>document.getElementById('articles-search-bar')).value;

    if (searchExpression && searchExpression !== '') {
      this.duegevSearchEngineSubscription = this.duegevSearchEngine.search(searchExpression).subscribe(response => {
        if (response.queryValidation === 'valid') {
          this.articles = response.values;
          this.numberOfSearchResults = response.values.length;
        }
      });
    } else {
      /* SEARCH FOR ALL DOCUMENTS */
      this.articleServiceGetArticlesSubscription = this.articleService.getArticles(this.searchquery).subscribe(response => {
        if (response.queryValidation && response.queryValidation === 'valid') {
          this.ngOnInit();
        }
      });
    }
  }

  requestNewContent() {
    let allArticleIDs = this.articles.map((article: WikiArticle) => article._id);
    let latestArticleID: number = Math.max(...allArticleIDs);
    this.articleService.fetchNextChunk(latestArticleID).subscribe(nextChunkOfArticles => {
      console.log(nextChunkOfArticles)
      if (nextChunkOfArticles.queryValidation === 'valid') {
        nextChunkOfArticles.articles.length && (nextChunkOfArticles.articles.length > 0)
          ? this.articles = [...this.articles, ...nextChunkOfArticles.articles] as WikiArticle[]
          : null;
      }
      this.changeDetectorReference.detectChanges();
    });
  }

  getString(RESOURCE_IDENTIFIER: string): string {
    return this.languageProvider.getString(RESOURCE_IDENTIFIER);
  }
}

@Component({
  selector: 'login-is-needed-dialog',
  template: `
  <h1 mat-dialog-title>Login needed!</h1>
  <div mat-dialog-content>Please login to use this feature</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LoginIsNeededDialog { }