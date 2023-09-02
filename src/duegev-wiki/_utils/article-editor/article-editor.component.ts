import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';

@Component({
  selector: 'duegev-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent {

  isSaveEnabled: boolean = false;

  localCategories: string[] = ['alibaba', 'beta', 'ceta'];
  addedCategories: string[] = [];

  localLabels: string[] = ['labello', 'léből', 'lebül'];
  addedLabels: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  MD_document: Subject<string> = new Subject<string>();

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

  /* MD EDITOR FN */
  getMD(event: string) { this.MD_document.next(event) }
}
