import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @Output() closeChange: EventEmitter<any> = new EventEmitter();

  teste = "TESTE";

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }


  close() {
    this.closeChange.emit();
  }

}
