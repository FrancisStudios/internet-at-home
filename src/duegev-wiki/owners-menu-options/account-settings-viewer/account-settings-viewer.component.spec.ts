import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsViewerComponent } from './account-settings-viewer.component';

describe('AccountSettingsViewerComponent', () => {
  let component: AccountSettingsViewerComponent;
  let fixture: ComponentFixture<AccountSettingsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsViewerComponent]
    });
    fixture = TestBed.createComponent(AccountSettingsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
