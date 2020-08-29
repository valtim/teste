import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
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
