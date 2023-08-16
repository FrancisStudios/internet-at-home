import { Component, OnInit } from '@angular/core';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';
import { CustomChipType } from 'src/ultils/custom-ui/custom-chip-list/custom-chip-list.component';
import { ArticleSearchQueryType, WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { GetUserByService } from 'src/ultils/services/authentication-service/get-user-by.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';

@Component({
  selector: 'duegev-browse',
  templateUrl: './duegev-browse.component.html',
  styleUrls: ['./duegev-browse.component.css']
})
export class DuegevBrowseComponent implements OnInit {
  searchquery: ArticleSearchQueryType = { query: '*' };
  articles: any | WikiArticle[] = ''

  constructor(
    private articleService: WikiArticleService,
    private timeProvider: DuegevTimeProvider,
    private getUserByService: GetUserByService) { }

  ngOnInit(): void {
    this.articleService.getArticles(this.searchquery).subscribe(response => {
      if (response.queryValidation && response.queryValidation === 'valid') {
        this.articles = response.articles;
      }
      console.log(this.articles);
    });
  }

  getTimeByCT(commonTime: number | string): string {
    if (typeof commonTime === 'string') commonTime = Number(commonTime);
    return this.timeProvider.getTimeByCommonTime(commonTime);
  }

  mapLabelsToChips(labels: string[] | string, color: string): CustomChipType[] {
    if (!Array.isArray(labels)) labels = JSON.parse(labels) as string[];
    return labels.map((label) => {
      return { text: label, color: color }
    });
  }

  copyPermalinkToClipboard(articleLink: string) {
    navigator.clipboard.writeText(`/article-viewer/${articleLink}`);
  }

  getNumberOfLikes(likers: string[] | string) {
    if (!Array.isArray(likers)) likers = JSON.parse(likers) as string[];
    return likers.length;
  }

  getUserByUID(UID: string | number) {
    UID = Number(UID);
    let user = this.getUserByService.getUserByUID(UID);
    console.log(user);
  }
}
