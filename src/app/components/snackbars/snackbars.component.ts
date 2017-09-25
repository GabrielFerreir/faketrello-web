import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

import { SnackbarsService } from "./snackbars.service";

@Component({
  selector: 'app-snackbars',
  templateUrl: './snackbars.component.html',
  styleUrls: ['./snackbars.component.css']
})
export class SnackbarsComponent implements AfterViewInit {
  @ViewChild('HTMLsnackbar') HTMLsnackbar: ElementRef;

  constructor(private snackbarsService: SnackbarsService) { }

  ngAfterViewInit() {
    // console.log(this.HTMLsnackbar)
    this.snackbarsService.snackbar = this.HTMLsnackbar;
  }

}
