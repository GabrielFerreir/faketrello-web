import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoComponent } from './autenticacao.component';
import { SnackbarsModule } from '../snackbars/snackbars.module';
import {SnackbarsComponent} from '../snackbars/snackbars.component';

@NgModule({
  imports: [
    CommonModule,
    SnackbarsModule
  ],
  declarations: [
    AutenticacaoComponent
  ],
  exports: [
    AutenticacaoComponent,
    SnackbarsComponent
  ]
})
export class AutenticacaoModule { }
