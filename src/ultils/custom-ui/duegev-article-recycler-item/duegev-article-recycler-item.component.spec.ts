import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevArticleRecyclerItemComponent } from './duegev-article-recycler-item.component';

describe('DuegevArticleRecyclerItemComponent', () => {
  let component: DuegevArticleRecyclerItemComponent;
  let fixture: ComponentFixture<DuegevArticleRecyclerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevArticleRecyclerItemComponent]
    });
    fixture = TestBed.createComponent(DuegevArticleRecyclerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
