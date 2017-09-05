import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendentComponent } from './pendent.component';

describe('PendentComponent', () => {
  let component: PendentComponent;
  let fixture: ComponentFixture<PendentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
