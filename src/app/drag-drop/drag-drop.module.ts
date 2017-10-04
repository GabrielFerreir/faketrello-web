import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropComponent} from './drag-drop.component';
import {MenuModule} from '../components/menu/menu.module';
import { AddElementoComponent } from './add-elemento/add-elemento.component';
import {DragDropService} from './drag-drop.service';
import { FormsModule } from '@angular/forms';

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
    AddElementoComponent
  ],
  exports: [DragDropComponent]
})
export class DragDropModule { }
