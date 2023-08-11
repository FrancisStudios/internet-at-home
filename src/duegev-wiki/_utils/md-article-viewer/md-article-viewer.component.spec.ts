import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdArticleViewerComponent } from './md-article-viewer.component';

describe('MdArticleViewerComponent', () => {
  let component: MdArticleViewerComponent;
  let fixture: ComponentFixture<MdArticleViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdArticleViewerComponent]
    });
    fixture = TestBed.createComponent(MdArticleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
