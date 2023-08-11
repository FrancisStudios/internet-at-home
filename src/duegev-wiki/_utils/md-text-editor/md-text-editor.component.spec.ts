import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTextEditorComponent } from './md-text-editor.component';

describe('MdTextEditorComponent', () => {
  let component: MdTextEditorComponent;
  let fixture: ComponentFixture<MdTextEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdTextEditorComponent]
    });
    fixture = TestBed.createComponent(MdTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
