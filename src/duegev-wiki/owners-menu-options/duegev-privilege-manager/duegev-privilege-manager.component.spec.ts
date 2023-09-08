import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuegevPrivilegeManagerComponent } from './duegev-privilege-manager.component';

describe('DuegevPrivilegeManagerComponent', () => {
  let component: DuegevPrivilegeManagerComponent;
  let fixture: ComponentFixture<DuegevPrivilegeManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuegevPrivilegeManagerComponent]
    });
    fixture = TestBed.createComponent(DuegevPrivilegeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
