import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmacaoComponent } from './popup-confirmacao.component';

describe('PopupConfirmacaoComponent', () => {
  let component: PopupConfirmacaoComponent;
  let fixture: ComponentFixture<PopupConfirmacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupConfirmacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
