import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListViewerComponent } from './article-list-viewer.component';

describe('ArticleListViewerComponent', () => {
  let component: ArticleListViewerComponent;
  let fixture: ComponentFixture<ArticleListViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListViewerComponent]
    });
    fixture = TestBed.createComponent(ArticleListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
