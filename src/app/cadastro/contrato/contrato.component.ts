import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
  providers: [MessageService]
})
export class ContratoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
