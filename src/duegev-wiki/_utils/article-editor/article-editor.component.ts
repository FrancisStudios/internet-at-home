import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';
import { LabelsAndCategoriesService } from 'src/ultils/services/article-provider-service/labels-and-categories.service';
import { DuegevTimeProvider } from 'src/ultils/services/duegev-wiki-proprietary/duegev-time-provider.service';
import { UserData } from 'src/data-types/authentication/user-data';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';

@Component({
  selector: 'duegev-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent {

  loggedInUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');

  localCategories: string[] = [];
  localCategoriesObject: any[] = [];
  addedCategories: string[] = [];

  localLabels: string[] = [];
  localLabelsObject: any[] = [];
  addedLabels: string[] = [];

  latestDocumentID: number = 0;
  currentGameTime: number = 0;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  /* SUBSCRIPTIONS */
  labelsSubscription: any;
  categoriesSubscription: any;
  latestArticleSubscription: any;
  duegevTimeServiceSubscription: any;

  constructor(
    private sortersService: LabelsAndCategoriesService,
    private articleService: WikiArticleService,
    private dialogProvider: MatDialog,
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
  }

  ngOnDestroy(): void {
    if (this.labelsSubscription) this.labelsSubscription.unsubscribe();
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
    if (this.latestArticleSubscription) this.latestArticleSubscription.unsubscribe();
    if (this.duegevTimeServiceSubscription) this.duegevTimeServiceSubscription.unsubscribe();
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
