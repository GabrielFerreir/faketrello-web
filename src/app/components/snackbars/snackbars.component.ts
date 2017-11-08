import {
  Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit,
  state, trigger, style, transition, animate
} from '@angular/core';

import { SnackbarsService } from './snackbars.service';

@Component({
  selector: 'app-snackbars',
  templateUrl: './snackbars.component.html',
  styleUrls: ['./snackbars.component.css'],
  // animations: [
  //   trigger('mostra', [
  //     state('inativo', style({
  //       transform: 'translateY(100%)'
  //     })),
  //     state('ativo',   style({
  //       transform: 'translateY(0)'
  //     })),
  //     transition('inativo => ativo', animate('480ms ease')),
  //     transition('ativo => inativo', animate('480ms ease'))
  //   ])
  // ]
})
export class SnackbarsComponent implements AfterViewInit {
  @ViewChild('HTMLsnackbar') HTMLsnackbar: ElementRef;
  @ViewChild('HTMLSnack') HTMLSnack: ElementRef;

  constructor(private snackbarsService: SnackbarsService) { }

  ngAfterViewInit() {
    this.snackbarsService.snackbar = this.HTMLsnackbar;
    this.snackbarsService.snack = this.HTMLSnack;
  }

}
