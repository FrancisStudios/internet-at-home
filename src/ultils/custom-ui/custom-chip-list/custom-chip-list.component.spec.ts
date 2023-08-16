import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChipListComponent } from './custom-chip-list.component';

describe('CustomChipListComponent', () => {
  let component: CustomChipListComponent;
  let fixture: ComponentFixture<CustomChipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomChipListComponent]
    });
    fixture = TestBed.createComponent(CustomChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
