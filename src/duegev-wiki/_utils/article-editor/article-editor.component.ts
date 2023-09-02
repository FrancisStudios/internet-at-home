import { Component, OnDestroy, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as Showdown from 'showdown';
import { MatDialog } from '@angular/material/dialog';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { LabelsAndCategoriesService } from 'src/ultils/services/article-provider-service/labels-and-categories.service';
import { ArticleSearchQueryType, DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { UserData } from 'src/data-types/authentication/user-data';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';

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

  /* SUBSCRIPTIONS */
  labelsSubscription: any;
  categoriesSubscription: any;
  latestArticleSubscription: any;
  duegevTimeServiceSubscription: any;

  constructor(
    private sortersService: LabelsAndCategoriesService,
    private articleService: WikiArticleService,
    private duegevTimeServer: DuegevTimeProvider) { }

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

    if (sessionStorage.getItem(SessionStorageItems.UNSAVED_ARTICLE)) {
      // PRELOAD UNSAVED ARTICLE
      let articleQueryObject = JSON.parse(sessionStorage.getItem(SessionStorageItems.UNSAVED_ARTICLE) as string);
      if (this.loggedInUser.uid === articleQueryObject.values.author) {
        (<HTMLInputElement>document.getElementById('duegev-article-title')).value = articleQueryObject.values.title;
        (<HTMLInputElement>document.getElementById('duegev-time-form')).value = articleQueryObject.values.date;
        this.addedLabels.push(...articleQueryObject.values.labels);
        this.addedCategories.push(...articleQueryObject.values.categories);
        (<HTMLTextAreaElement>document.getElementById('document-editor')).value = articleQueryObject.values.document;
        this.MDContentText = articleQueryObject.values.document;
        this.HTMLContentPreview = this.converter.makeHtml(this.MDContentText);
      }
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

  save(intent: 'presave' | 'save') {
    if (this.loggedInUser && this.loggedInUser.password && this.loggedInUser.uid && this.loggedInUser.username) {
      const title: string = (<HTMLInputElement>document.getElementById('duegev-article-title')).value || '';
      const duegev_date: string = (<HTMLInputElement>document.getElementById('duegev-time-form')).value;

      let saveQuery = {
        query: 'insert',
        values: {
          _id: this.latestDocumentID + 1,
          article_id: `article_${this.latestDocumentID + 1}`,
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
          sessionStorage.removeItem(SessionStorageItems.UNSAVED_ARTICLE);
          break;
      }
    } else window.alert('Sorry, we can not save this document. It seems like you are not logged in! Please refresh the page, and try logging in.');
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
    console.log('addLabel')
    if (this.localLabels.includes(event.value)) this.addedLabels.push(event.value);
    (<HTMLInputElement>document.getElementById('label-input-field')).value = '';
  }

  selectedLabel(event: any) {
    (<HTMLInputElement>document.getElementById('label-input-field')).value = event.option.value;
  }
}
