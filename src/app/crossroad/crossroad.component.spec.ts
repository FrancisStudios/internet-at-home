import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossroadComponent } from './crossroad.component';

describe('CrossroadComponent', () => {
  let component: CrossroadComponent;
  let fixture: ComponentFixture<CrossroadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossroadComponent]
    });
    fixture = TestBed.createComponent(CrossroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
