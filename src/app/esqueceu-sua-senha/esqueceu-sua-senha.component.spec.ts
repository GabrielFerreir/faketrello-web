import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueceuSuaSenhaComponent } from './esqueceu-sua-senha.component';

describe('EsqueceuSuaSenhaComponent', () => {
  let component: EsqueceuSuaSenhaComponent;
  let fixture: ComponentFixture<EsqueceuSuaSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueceuSuaSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueceuSuaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
