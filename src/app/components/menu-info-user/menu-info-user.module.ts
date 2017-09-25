import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuInfoUserComponent} from './menu-info-user.component';
import {MenuInfoUserDirective} from './menu-info-user.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MenuInfoUserComponent,
    MenuInfoUserDirective
  ],
  exports: [
    MenuInfoUserComponent,
    MenuInfoUserDirective
  ]
})
export class MenuInfoUserModule { }
