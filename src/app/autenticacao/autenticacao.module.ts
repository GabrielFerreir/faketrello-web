import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AutenticacaoComponent } from './autenticacao.component';
import { LoginUserComponent } from './login-user/login-user.component';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';

import { AutenticacaoService } from './autenticacao.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AutenticacaoRoutingModule,
    FormsModule
  ],
  declarations: [ AutenticacaoComponent, LoginUserComponent ],
  providers: []
})
export class AutenticacaoModule { }
