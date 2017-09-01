import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { SnackbarsService } from "./snackbars.service";

@Component({
  selector: 'app-snackbars',
  templateUrl: './snackbars.component.html',
  styleUrls: ['./snackbars.component.css']
})
export class SnackbarsComponent implements OnInit {

  constructor(private snackbarsService: SnackbarsService) { }

  ngOnInit() {
    console.log(this.HTMLsnackbar)
    this.snackbarsService.snackbar = this.HTMLsnackbar;
  }
  @ViewChild('HTMLsnackbar') HTMLsnackbar: ElementRef;

  // this.tela1.nativeElement.style = "transition: all 480ms ease-out; transform: translateX(-300px)"

}
