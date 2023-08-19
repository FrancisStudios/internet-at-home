import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevCreativeMenuComponent } from './duegev-creative-menu.component';

describe('DuegevCreativeMenuComponent', () => {
  let component: DuegevCreativeMenuComponent;
  let fixture: ComponentFixture<DuegevCreativeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevCreativeMenuComponent]
    });
    fixture = TestBed.createComponent(DuegevCreativeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
