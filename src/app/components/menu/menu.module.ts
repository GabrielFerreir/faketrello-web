import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {MenuDirective} from './menu.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MenuComponent,
    MenuDirective
  ], exports: [
    MenuComponent,
    MenuDirective
  ]
})
export class MenuModule { }
