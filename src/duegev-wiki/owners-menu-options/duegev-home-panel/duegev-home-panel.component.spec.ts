import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevHomePanelComponent } from './duegev-home-panel.component';

describe('DuegevHomePanelComponent', () => {
  let component: DuegevHomePanelComponent;
  let fixture: ComponentFixture<DuegevHomePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevHomePanelComponent]
    });
    fixture = TestBed.createComponent(DuegevHomePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
