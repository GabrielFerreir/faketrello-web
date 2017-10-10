import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropComponent} from './drag-drop.component';
import {MenuModule} from '../components/menu/menu.module';
import {DragDropService} from './drag-drop.service';
import { FormsModule } from '@angular/forms';
import { AddBlocosComponent } from './add-blocos/add-blocos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MenuModule
  ],
  providers: [
    DragDropService
  ],
  declarations: [
    DragDropComponent,
  ],
  exports: [DragDropComponent]
})
export class DragDropModule { }
