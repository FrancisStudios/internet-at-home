import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevHomeComponent } from './duegev-home.component';

describe('DuegevHomeComponent', () => {
  let component: DuegevHomeComponent;
  let fixture: ComponentFixture<DuegevHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevHomeComponent]
    });
    fixture = TestBed.createComponent(DuegevHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
