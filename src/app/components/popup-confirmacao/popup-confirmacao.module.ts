import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmacaoComponent } from './popup-confirmacao.component';
import {PopupConfirmacaoService} from './popup-confirmacao.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PopupConfirmacaoComponent],
  providers: [ PopupConfirmacaoService ],
  exports: [ PopupConfirmacaoComponent ]
})
export class PopupConfirmacaoModule { }
