import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';
import { CustomChipType } from 'src/ultils/custom-ui/custom-chip-list/custom-chip-list.component';
import { DuegevArticleLikeService } from 'src/ultils/services/article-provider-service/like.service';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';

@Component({
  selector: 'duegev-document-viewer',
  templateUrl: './duegev-document-viewer.component.html',
  styleUrls: ['./duegev-document-viewer.component.css']
})
export class DuegevDocumentViewerComponent implements OnInit, OnDestroy {

  article: any;

  UIDDictionary: any[] = [];
  private routeSubscription: any;
  gArticle_ID: string = '';

  constructor(
    private timeProvider: DuegevTimeProvider,
    private getUserByService: GetUserByService,
    private likeService: DuegevArticleLikeService,
    private dialogProvider: MatDialog,
    private articleService: WikiArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    /* GET ALL USERS FOR UID DICTIONARY*/
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

    this.routeSubscription = this.route.params.subscribe(params => {
      this.gArticle_ID = params['article_id'];
      this.articleService.getArticleByID(this.gArticle_ID).subscribe(articleResponse => {
        this.article = JSON.parse(JSON.stringify(articleResponse.articles))[0];
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  getTimeByCT(commonTime: number | string): string {
    if (typeof commonTime === 'string') commonTime = Number(commonTime);
    return this.timeProvider.getTimeByCommonTime(commonTime);
  }

  getNicknameByUID(UID: string | number): string {
    UID = Number(UID);
    let selectedUser = this.UIDDictionary.filter(dictionaryLine => {
      return dictionaryLine.UID === UID;
    });
    return selectedUser[0]?.nickname;
  }

  mapLabelsToChips(labels: string[] | string, color: string): CustomChipType[] {
    if (!Array.isArray(labels)) labels = JSON.parse(labels) as string[];
    return labels.map((label) => {
      return { text: label, color: color };
    });
  }

  getNumberOfLikes(likers: string[] | string | number[]) {
    if (!Array.isArray(likers)) likers = JSON.parse(likers) as string[];
    return likers.length;
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
          this.likeService.removeLike(requestObject).subscribe(res => {
            this.ngOnInit();
          });
        } else {
          this.likeService.giveLike(requestObject).subscribe(res => {
            this.ngOnInit();
          });
        }

      } else this.dialogProvider.open(LoginForLikeIsNeededDialog);
    } else this.dialogProvider.open(LoginForLikeIsNeededDialog);

  }

  copyPermalinkToClipboard(articleLink: string) {
    navigator.clipboard.writeText(`/article-viewer/${articleLink}`);
  }
}

@Component({
  selector: 'login-for-like-is-needed-dialog',
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
export class LoginForLikeIsNeededDialog { }