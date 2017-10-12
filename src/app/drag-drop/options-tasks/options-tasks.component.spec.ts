import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsTasksComponent } from './options-tasks.component';

describe('OptionsTasksComponent', () => {
  let component: OptionsTasksComponent;
  let fixture: ComponentFixture<OptionsTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
