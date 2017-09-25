import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu-info-user',
  templateUrl: './menu-info-user.component.html',
  styleUrls: ['./menu-info-user.component.css']
})
export class MenuInfoUserComponent implements OnInit {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @Output() closeChange: EventEmitter<any> = new EventEmitter();

  constructor(  private elementRef: ElementRef) { }

  ngOnInit() {
  }

  close() {
    this.closeChange.emit();
  }

}
