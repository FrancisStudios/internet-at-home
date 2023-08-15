import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevBrowseComponent } from './duegev-browse.component';

describe('DuegevBrowseComponent', () => {
  let component: DuegevBrowseComponent;
  let fixture: ComponentFixture<DuegevBrowseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevBrowseComponent]
    });
    fixture = TestBed.createComponent(DuegevBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
