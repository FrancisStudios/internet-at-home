import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevDocumentViewerComponent } from './duegev-document-viewer.component';

describe('DuegevDocumentViewerComponent', () => {
  let component: DuegevDocumentViewerComponent;
  let fixture: ComponentFixture<DuegevDocumentViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevDocumentViewerComponent]
    });
    fixture = TestBed.createComponent(DuegevDocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
