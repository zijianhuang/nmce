import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmceHtmlEditorComponent } from './nmce-html-editor.component';

describe('NmceHtmlEditorComponent', () => {
  let component: NmceHtmlEditorComponent;
  let fixture: ComponentFixture<NmceHtmlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmceHtmlEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmceHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
