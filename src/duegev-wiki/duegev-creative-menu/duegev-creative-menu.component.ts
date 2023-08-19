import { Component, OnInit } from '@angular/core';
import { LabelsAndCategoriesService } from 'src/ultils/services/article-provider-service/labels-and-categories.service';

@Component({
  selector: 'duegev-creative-menu',
  templateUrl: './duegev-creative-menu.component.html',
  styleUrls: ['./duegev-creative-menu.component.css']
})
export class DuegevCreativeMenuComponent implements OnInit {
  Labels: any[] = [];
  labelsValues: string[] = [];
  Categories: any[] = [];
  categoriesValues: string[] = [];

  addedCategories: { text: string, color: string }[] = [];
  addedLabels: { text: string, color: string }[] = [];

  constructor(private sortersService: LabelsAndCategoriesService) { }

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
  }

  addLabel() {
    let selectedValue = (<HTMLSelectElement>document.getElementById('creative-menu-labels')).value;
    this.addedLabels.push({text: selectedValue, color: 'primary'});
  }

  addCategory() {
    let selectedValue = (<HTMLSelectElement>document.getElementById('creative-menu-categories')).value;
    this.addedCategories.push({text: selectedValue, color: 'dark'});
  }
}
