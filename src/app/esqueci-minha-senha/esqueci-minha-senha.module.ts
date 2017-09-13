import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SnackbarsModule } from '../components/snackbars/snackbars.module';

import { EsqueciMinhaSenhaComponent } from './esqueci-minha-senha';
import { EsqueceuSuaSenhaComponent } from './esqueceu-sua-senha/esqueceu-sua-senha.component';
import { EsqueceuSeuSenhaAlterarComponent } from './esqueceu-seu-senha-alterar/esqueceu-seu-senha-alterar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SnackbarsModule
  ],
  declarations: [
    EsqueciMinhaSenhaComponent,
    EsqueceuSuaSenhaComponent,
    EsqueceuSeuSenhaAlterarComponent
  ]
})
export class EsqueciMinhaSenhaModule { }
