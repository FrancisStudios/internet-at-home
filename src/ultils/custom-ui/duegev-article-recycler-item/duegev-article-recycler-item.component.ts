import { Component, OnDestroy, OnInit } from '@angular/core';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';

@Component({
  selector: 'duegev-article-recycler-item',
  templateUrl: './duegev-article-recycler-item.component.html',
  styleUrls: ['./duegev-article-recycler-item.component.css']
})
export class DuegevArticleRecyclerItemComponent implements OnInit, OnDestroy {
  blin: string[] = ['one', 'two', 'three', 'four'];

  myArticles: WikiArticle[] = [];
  allArticles: WikiArticle[] = [];

  getAllArticlesSubscription: any;
  getMyArticlesSubscription: any;

  constructor(
    private duegevArticleService: WikiArticleService
  ) { }

  ngOnInit(): void {
    this.getAllArticlesSubscription = this.duegevArticleService.getArticles({ query: '*' }).subscribe(response => {
      if(response.queryValidation === 'valid') {
        this.allArticles = response.articles;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getAllArticlesSubscription) this.getAllArticlesSubscription.unsubscribe();
  }

}
