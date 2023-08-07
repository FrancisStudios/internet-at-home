import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevAccountComponent } from './duegev-account.component';

describe('DuegevAccountComponent', () => {
  let component: DuegevAccountComponent;
  let fixture: ComponentFixture<DuegevAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevAccountComponent]
    });
    fixture = TestBed.createComponent(DuegevAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
