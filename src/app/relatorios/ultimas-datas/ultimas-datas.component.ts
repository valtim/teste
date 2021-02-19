import { Component, Input, OnInit } from '@angular/core';
import {OverlayPanel} from 'primeng-lts/overlaypanel';

@Component({
  selector: 'app-ultimas-datas',
  templateUrl: './ultimas-datas.component.html',
  styleUrls: ['./ultimas-datas.component.css']
})
export class UltimasDatasComponent implements OnInit {

  @Input() valor;

  constructor() { }

  ngOnInit(): void {

  }

}
