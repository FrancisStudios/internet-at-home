import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { LabelsAndCategoriesService } from 'src/ultils/services/article-provider-service/labels-and-categories.service';
import { ArticleSearchQueryType, WikiArticleService } from 'src/ultils/services/article-provider-service/wiki-article.service';

@Component({
  selector: 'duegev-creative-menu',
  templateUrl: './duegev-creative-menu.component.html',
  styleUrls: ['./duegev-creative-menu.component.css']
})
export class DuegevCreativeMenuComponent implements OnInit, OnDestroy {
  Labels: any[] = [];
  labelsValues: string[] = [];
  Categories: any[] = [];
  categoriesValues: string[] = [];
  latestDocumentID: number = 0;
  MD_document: Subject<string> = new Subject<string>();

  addedCategories: { text: string, color: string }[] = [];
  addedLabels: { text: string, color: string }[] = [];

  isSaveEnabled: boolean = false;

  @Output() closeCreativeMenu = new EventEmitter<boolean>();

  constructor(
    private sortersService: LabelsAndCategoriesService,
    private articleService: WikiArticleService,
    private dialogProvider: MatDialog) { }

  ngOnInit(): void {
    this.sortersService.getSorters({ query: 'labels' }).subscribe(labelsList => {
      if (labelsList.queryValidation && labelsList.queryValidation === 'valid') {
        this.Labels.push(...labelsList.values);
        this.Labels.forEach(label => { this.labelsValues.push(label.label) });
      }
    });

    this.sortersService.getSorters({ query: 'categories' }).subscribe(categoryList => {
      if (categoryList.queryValidation && categoryList.queryValidation === 'valid') {
        this.Categories.push(...categoryList.values);
        this.Categories.forEach(category => { this.categoriesValues.push(category.category) });
      }
    });
    this.articleService.getLatest().subscribe(latestArticleQueryResponse => {
      if (latestArticleQueryResponse.queryValidation === 'valid') {
        this.latestDocumentID = latestArticleQueryResponse.articles[0]._id;
      }
    });
  }

  ngOnDestroy(): void {
    this.isSaveEnabled = false;
    this.MD_document.unsubscribe();
  }

  addLabel() {
    let selectedValue = (<HTMLSelectElement>document.getElementById('creative-menu-labels')).value;
    this.addedLabels.push({ text: selectedValue, color: 'primary' });
  }

  addCategory() {
    let selectedValue = (<HTMLSelectElement>document.getElementById('creative-menu-categories')).value;
    this.addedCategories.push({ text: selectedValue, color: 'dark' });
  }

  closeCreativeMenuWindow() {
    this.isSaveEnabled = false;
    this.closeCreativeMenu.emit(true);
  }

  getMD(event: string) { this.MD_document.next(event) }

  saveDocument() {
    let loggedInUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) || '');

    if (loggedInUser && (loggedInUser.password && loggedInUser.username)) {
      this.isSaveEnabled = true;
      this.MD_document.subscribe(document_value => {
        let title = (<HTMLInputElement>document.getElementById('article-title-input')).value;
        let duegev_date = Number((<HTMLInputElement>document.getElementById('article-duegev-time-input')).value);
        let nilDate: Date = new Date();

        let currentDate = `${nilDate.getFullYear()}.${nilDate.getMonth() + 1}.${nilDate.getDate()}`;

        let query: ArticleSearchQueryType = {
          query: 'insert',
          values: {
            _id: this.latestDocumentID + 1,
            article_id: `article_${this.latestDocumentID + 1}`,
            title: title,
            date: duegev_date,
            author: loggedInUser.uid,
            irl_date: currentDate,
            labels: this.addedLabels.map(value => value.text),
            categories: this.addedCategories.map(value => value.text),
            document: document_value,
            likes: []
          }
        }

        this.articleService.insertNewArticle(query).subscribe(queryResponse => {
          if (queryResponse.queryValidation && queryResponse.queryValidation === 'valid') {
            this.dialogProvider.open(DuegevDocumentSaveStatusDialog);
            this.closeCreativeMenuWindow();
          } else {
            sessionStorage.setItem(SessionStorageItems.UNSAVED_ARTICLE, JSON.stringify(query));
            this.dialogProvider.open(DuegevIncompleteSaveStatusDialog);
            this.closeCreativeMenuWindow();
          }
        });
      })
    } else {
      /* TODO: 
      - save the document into local storage 
      - open dialog with login options 
      */
    }
  }
}

/* 
  STATUS FEEDBACK DIALOGS
*/
@Component({
  selector: 'duegev-document-save-status-dialog',
  template: `
  <h1 mat-dialog-title>Document Saved!</h1>
  <div mat-dialog-content>Your document is saved, now you can go and see it in the articles browser</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DuegevDocumentSaveStatusDialog { }

@Component({
  selector: 'duegev-incomplete-save-status-dialog',
  template: `
  <h1 mat-dialog-title>ERROR!</h1>
  <div mat-dialog-content>
    Your document can not be saved because of server side issues. Contact webmaster!
    <br>
    <i>github.com/FrancisStudios</i>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DuegevIncompleteSaveStatusDialog { }