import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from 'src/data-types/authentication/user-data';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';

@Component({
  selector: 'duegev-home-panel',
  templateUrl: './duegev-home-panel.component.html',
  styleUrls: ['./duegev-home-panel.component.css']
})
export class DuegevHomePanelComponent implements OnInit, OnDestroy {

  latestArticle: WikiArticle | any;
  mostLikedArticle: WikiArticle | any;

  articles: WikiArticle[] | any[] = [];

  UIDDictionary: any[] = [];

  /* SUBSCRIPTIONS */
  getLatestArticleSubscription: any;
  getMostLikedArticleSubscription: any;

  constructor(
    private duegevArticleService: WikiArticleService,
    private duegevTimeProvider: DuegevTimeProvider,
    private getUserByService: GetUserByService) { }

  ngOnInit(): void {
    this.getLatestArticleSubscription = this.duegevArticleService.getLatest().subscribe(response => {
      if (response.queryValidation === 'valid') {
        this.latestArticle = response.articles[0];
        this.latestArticle.document = this.limitArticleDocumentPreviewLength(this.latestArticle);
        this.articles.push(this.latestArticle);
      }
    });

    this.getMostLikedArticleSubscription = this.duegevArticleService.getMostLiked().subscribe(response => {
      if (response.queryValidation === 'valid') {
        this.mostLikedArticle = response.articles[0];
        this.mostLikedArticle.document = this.limitArticleDocumentPreviewLength(this.mostLikedArticle);
        this.articles.push(this.mostLikedArticle);
      }
    });

    this.getUserByService.getAllUsers().subscribe(usersList => {
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

  limitArticleDocumentPreviewLength(article: WikiArticle): string {
    return `${article.document.substring(0, 200)} \n**...**`;
  }

  ngOnDestroy(): void {
    if (this.getLatestArticleSubscription) this.getLatestArticleSubscription.unsubscribe();
    if (this.getMostLikedArticleSubscription) this.getLatestArticleSubscription.unsubscribe();
  }

  getTimeByCT(commonTime: number | string): string {
    if (typeof commonTime === 'string') commonTime = Number(commonTime);
    return this.duegevTimeProvider.getTimeByCommonTime(commonTime);
  }

  getNicknameByUID(UID: string | number): string {
    UID = Number(UID);
    let selectedUser = this.UIDDictionary.filter(dictionaryLine => {
      return dictionaryLine.UID === UID;
    });
    return selectedUser[0]?.nickname;
  }
}
