import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropComponent} from './drag-drop.component';
import {MenuModule} from "../components/menu/menu.module";

@NgModule({
  imports: [
    CommonModule,
    MenuModule
  ],
  declarations: [
    DragDropComponent
  ],
  exports: [DragDropComponent]
})
export class DragDropModule { }
