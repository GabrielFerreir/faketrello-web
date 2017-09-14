import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticaComponent } from './autentica.component';

describe('AutenticaComponent', () => {
  let component: AutenticaComponent;
  let fixture: ComponentFixture<AutenticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
