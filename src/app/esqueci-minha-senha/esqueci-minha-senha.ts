import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, RouterOutlet } from '@angular/router';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-esqueceu-sua-senha',
  templateUrl: './esqueci-minha-senha.html',
  styleUrls: ['./esqueci-minha-senha.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {


  constructor() { }

  ngOnInit() {}
}
