import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueceuSeuSenhaAlterarComponent } from './esqueceu-seu-senha-alterar.component';

describe('EsqueceuSeuSenhaAlterarComponent', () => {
  let component: EsqueceuSeuSenhaAlterarComponent;
  let fixture: ComponentFixture<EsqueceuSeuSenhaAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueceuSeuSenhaAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueceuSeuSenhaAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
