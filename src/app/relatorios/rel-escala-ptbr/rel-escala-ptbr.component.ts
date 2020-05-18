import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-rel-escala-ptbr',
  templateUrl: './rel-escala-ptbr.component.html',
  styleUrls: ['./rel-escala-ptbr.component.css']
})
export class RelEscalaPtbrComponent implements OnInit {
  dataInicio: Date;
  dataFim: Date;
  locale_pt: any;
  tudoPronto: boolean;
  dataReferencia: Date;
  filtroBase: any;
  baseDeOperacaoSelecionada;
  resultado: [];
  empresa: string;
  retReferencia: string;
  retInicio: string;
  retFim: string;
  ICAO: string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  


    this.api.getCombos().then(x => {

      let nova = [{ value: undefined, label: '' }];
      this.filtroBase = x.BaseDeOperacao;

      this.baseDeOperacaoSelecionada = x.BaseDeOperacao[0].value;

      this.rodarRelatorio();
    });

    this.locale_pt = this.api.getLocale('pt');

    const date = new Date();

    this.dataReferencia = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    if (date.getDate() < 15) {
      this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
      this.dataFim = new Date(date.getFullYear(), date.getMonth(), 15);
      return;
    }


    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 15);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  }

  rodarRelatorio(){
    this.tudoPronto = false;
    this.api.getEscalaPTBR(this.dataReferencia, this.dataInicio, this.dataFim, this.baseDeOperacaoSelecionada).then(x=>{
        this.resultado = x.tabela;
        this.empresa = x.Empresa;
        this.retReferencia = x.dataReferencia;
        this.retInicio = x.dataInicio;
        this.retFim = x.dataFim;
        this.ICAO = x.ICAO;
        this.tudoPronto = true;
    });
  }

}
