import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarSenhaDeUsuarioComponent } from './alterar-senha-de-usuario.component';

describe('AlterarSenhaDeUsuarioComponent', () => {
  let component: AlterarSenhaDeUsuarioComponent;
  let fixture: ComponentFixture<AlterarSenhaDeUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarSenhaDeUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarSenhaDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
