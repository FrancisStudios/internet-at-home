import { Component, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as Showdown from 'showdown';
import { ArticleSearchQueryType, WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { LabelsAndCategoriesService } from 'src/ultils/services/article-provider-service/labels-and-categories.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { UserData } from 'src/data-types/authentication/user-data';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { WikiArticle } from 'src/data-types/duegev-wiki/article.type';

@Component({
  selector: 'duegev-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

  showdown = Showdown;
  converter = new this.showdown.Converter();

  loggedInUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');
  currentIRLDate: string = this.duegevTimeServer.getIRLTime();

  localArticle: WikiArticle | any;

  localCategories: string[] = [];
  localCategoriesObject: any[] = [];
  addedCategories: string[] = [];

  localLabels: string[] = [];
  localLabelsObject: any[] = [];
  addedLabels: string[] = [];

  latestDocumentID: number = 0;
  currentGameTime: number = 0;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  HTMLContentPreview: string = '';
  MDContentText: string = '';

  isRouterMode: boolean = false;

  /* SUBSCRIPTIONS */
  labelsSubscription: any;
  categoriesSubscription: any;
  latestArticleSubscription: any;
  duegevTimeServiceSubscription: any;

  constructor(
    private sortersService: LabelsAndCategoriesService,
    private articleService: WikiArticleService,
    private duegevTimeServer: DuegevTimeProvider,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.labelsSubscription = this.sortersService.getSorters({ query: 'labels' }).subscribe(labelsList => {
      if (labelsList.queryValidation && labelsList.queryValidation === 'valid') {
        this.localLabelsObject.push(...labelsList.values);
        this.localLabelsObject.forEach(label => { this.localLabels.push(label.label) });
      }
    });

    this.categoriesSubscription = this.sortersService.getSorters({ query: 'categories' }).subscribe(categoryList => {
      if (categoryList.queryValidation && categoryList.queryValidation === 'valid') {
        this.localCategoriesObject.push(...categoryList.values);
        this.localCategoriesObject.forEach(category => { this.localCategories.push(category.category) });
      }
    });

    this.latestArticleSubscription = this.articleService.getLatest().subscribe(latestArticleQueryResponse => {
      if (latestArticleQueryResponse.queryValidation === 'valid') {
        this.latestDocumentID = latestArticleQueryResponse.articles[0]._id;
      }
    });

    this.duegevTimeServiceSubscription = this.duegevTimeServer.getTime().subscribe(response => {
      if (response.queryValidation === 'valid') {
        this.currentGameTime = response.values;
        (<HTMLInputElement>document.getElementById('duegev-time-form')).value = response.values;
      }
    });

    /* PRELOAD UNSAVED ARTICLE */

    if (sessionStorage.getItem(SessionStorageItems.UNSAVED_ARTICLE)) {

      let articleQueryObject = JSON.parse(sessionStorage.getItem(SessionStorageItems.UNSAVED_ARTICLE) as string);
      this.localArticle = articleQueryObject.values;

      if (this.loggedInUser.uid === Number(articleQueryObject.values.author)) {
        (<HTMLInputElement>document.getElementById('duegev-article-title')).value = articleQueryObject.values.title;
        (<HTMLInputElement>document.getElementById('duegev-time-form')).value = articleQueryObject.values.date;
        if (typeof articleQueryObject.values.labels === 'string') articleQueryObject.values.labels = JSON.parse(articleQueryObject.values.labels);
        this.addedLabels.push(...articleQueryObject.values.labels);
        if (typeof articleQueryObject.values.categories === 'string') articleQueryObject.values.categories = JSON.parse(articleQueryObject.values.categories);
        this.addedCategories.push(...articleQueryObject.values.categories);
        (<HTMLTextAreaElement>document.getElementById('document-editor')).value = articleQueryObject.values.document;
        this.MDContentText = articleQueryObject.values.document;
        this.HTMLContentPreview = this.converter.makeHtml(this.MDContentText);
      }
    }

    /* DETERMINES IF WE ARE COMPONENT OR ROUTED MODE */

    if (this.router.url === '/duegev-wiki/article-editor') {
      this.isRouterMode = true;
    }
  }

  ngOnDestroy(): void {
    if (this.labelsSubscription) this.labelsSubscription.unsubscribe();
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
    if (this.latestArticleSubscription) this.latestArticleSubscription.unsubscribe();
    if (this.duegevTimeServiceSubscription) this.duegevTimeServiceSubscription.unsubscribe();
  }

  /* MD editor functions */
  onMDInput() {
    this.MDContentText = (<HTMLTextAreaElement>document.getElementById('document-editor')).value || '';
    this.HTMLContentPreview = this.converter.makeHtml(this.MDContentText);

    var previewPanel = <HTMLDivElement>document.getElementById('document-preview');
    previewPanel.scrollTop = previewPanel.scrollHeight;

    this.save('presave');
  }

  nullifyFields() {
    (<HTMLInputElement>document.getElementById('duegev-article-title')).value = '';
    (<HTMLInputElement>document.getElementById('duegev-time-form')).value = `${this.currentGameTime}`;
    this.addedLabels = []; this.addedCategories = [];
    (<HTMLTextAreaElement>document.getElementById('document-editor')).value = '';
    this.MDContentText = '';
    this.HTMLContentPreview = this.converter.makeHtml(this.MDContentText);
  }

  save(intent: 'presave' | 'save' | 'update') {
    if (this.loggedInUser && this.loggedInUser.password && this.loggedInUser.uid && this.loggedInUser.username) {
      const title: string = (<HTMLInputElement>document.getElementById('duegev-article-title')).value || '';
      const duegev_date: number = Number((<HTMLInputElement>document.getElementById('duegev-time-form')).value);

      let prepared_article_id = this.isRouterMode ? this.localArticle.article_id : `article_${this.latestDocumentID + 1}`;

      let saveQuery: ArticleSearchQueryType = {
        query: 'insert',
        values: {
          _id: this.latestDocumentID + 1,
          article_id: prepared_article_id,
          title: title,
          date: duegev_date,
          author: this.loggedInUser.uid,
          irl_date: this.duegevTimeServer.getIRLTime(),
          labels: this.addedLabels,
          categories: this.addedCategories,
          document: this.MDContentText,
          likes: []
        }
      }

      switch (intent) {
        case 'presave':
          let saveQuery_stringified = JSON.stringify(saveQuery);
          sessionStorage.setItem(SessionStorageItems.UNSAVED_ARTICLE, saveQuery_stringified);
          break;

        case 'save':
          if ((title && title !== '') && (duegev_date && duegev_date !== 0) && (this.MDContentText && this.MDContentText !== '')) {
            this.articleService.insertNewArticle(saveQuery).subscribe(queryResponse => {
              if (queryResponse.queryValidation && queryResponse.queryValidation === 'valid') {
                window.alert('Article successfully saved to DB');
                sessionStorage.removeItem(SessionStorageItems.UNSAVED_ARTICLE);
                this.nullifyFields();
              } else {
                window.alert('Error: we could not save this document due to technical issues...');
              }
            });
          } else window.alert('Please fill all fields before saving!');
          break;

        case 'update':
          if ((title && title !== '') && (duegev_date && duegev_date !== 0) && (this.MDContentText && this.MDContentText !== '')) {


          } else window.alert('Please fill all fields before saving!');
          break;
      }
    } else window.alert('Sorry, we can not save this document. It seems like you are not logged in! Please refresh the page, and try logging in.');
  }

  navigateBack(): void {
    this.location.back();
  }

  clearUnsaved(): void {
    sessionStorage.removeItem(SessionStorageItems.UNSAVED_ARTICLE);
    this.nullifyFields();
  }

  /* SORTER OPERTATORS */

  removeCategory(category: any) {
    this.addedCategories = this.addedCategories.filter(addedCategory => addedCategory !== category);
  }

  addCategory(event: any) {
    if (this.localCategories.includes(event.value)) this.addedCategories.push(event.value);
    (<HTMLInputElement>document.getElementById('category-input-field')).value = '';
  }

  selectedCategory(event: any) {
    (<HTMLInputElement>document.getElementById('category-input-field')).value = event.option.value;
  }

  removeLabel(label: any) {
    this.addedLabels = this.addedLabels.filter(addedLabel => addedLabel !== label);
  }

  addLabel(event: any) {
    if (this.localLabels.includes(event.value)) this.addedLabels.push(event.value);
    (<HTMLInputElement>document.getElementById('label-input-field')).value = '';
  }

  selectedLabel(event: any) {
    (<HTMLInputElement>document.getElementById('label-input-field')).value = event.option.value;
  }
}
