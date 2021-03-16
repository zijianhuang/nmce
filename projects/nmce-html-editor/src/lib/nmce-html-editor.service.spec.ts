import { TestBed } from '@angular/core/testing';

import { NmceHtmlEditorService } from './nmce-html-editor.service';

describe('NmceHtmlEditorService', () => {
  let service: NmceHtmlEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmceHtmlEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
