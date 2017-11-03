import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropComponent} from './drag-drop.component';
import {MenuModule} from '../components/menu/menu.module';
import {DragDropService} from './drag-drop.service';
import { FormsModule } from '@angular/forms';
import { OptionsTasksComponent } from './options-tasks/options-tasks.component';
import { PesquisaDeMembrosDoProjetoPipe } from './pesquisa-de-membros-do-projeto.pipe';
import {ArrowBackModule} from "../components/arrow-back/arrow-back.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    ArrowBackModule
  ],
  providers: [
    DragDropService
  ],
  declarations: [
    DragDropComponent,
    OptionsTasksComponent,
    PesquisaDeMembrosDoProjetoPipe
  ],
  exports: [DragDropComponent]
})
export class DragDropModule { }
