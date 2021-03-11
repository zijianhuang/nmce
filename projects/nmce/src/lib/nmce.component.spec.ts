import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmceComponent } from './nmce.component';

describe('NmceComponent', () => {
  let component: NmceComponent;
  let fixture: ComponentFixture<NmceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
