import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDadosDeUsuarioComponent } from './alterar-dados-de-usuario.component';

describe('AlterarDadosDeUsuarioComponent', () => {
  let component: AlterarDadosDeUsuarioComponent;
  let fixture: ComponentFixture<AlterarDadosDeUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarDadosDeUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDadosDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
