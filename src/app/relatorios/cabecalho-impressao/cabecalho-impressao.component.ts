import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-cabecalho-impressao',
  templateUrl: './cabecalho-impressao.component.html',
  styleUrls: ['./cabecalho-impressao.component.css']
})
export class CabecalhoImpressaoComponent implements OnInit {

  @Input() titulo;

  @Input() form;

  @Input() revisao;

  @Input() data;

  @Input() registro;

  @Input() dataConsulta;

  ExibirRevisao;

  logo;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.ExibirRevisao = (this.revisao != undefined || this.data != undefined || this.form != undefined);

    this.logo = this.api.getLogo();
    
  }

}
