import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElementoComponent } from './add-elemento.component';

describe('AddElementoComponent', () => {
  let component: AddElementoComponent;
  let fixture: ComponentFixture<AddElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
