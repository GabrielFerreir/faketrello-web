import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInfoUserComponent } from './menu-info-user.component';

describe('MenuInfoUserComponent', () => {
  let component: MenuInfoUserComponent;
  let fixture: ComponentFixture<MenuInfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInfoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
