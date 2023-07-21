import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-rel-diario-horas-voadas',
  templateUrl: './rel-diario-horas-voadas.component.html',
  styleUrls: ['./rel-diario-horas-voadas.component.css']
})
export class RelDiarioHorasVoadasComponent implements OnInit {
  data: Date;
  locale_pt: any;

  relatorio_ok = true;
  previstas: any;
  cols: any;
  dataDaConsulta: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    const date = new Date();
    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');   
    
    //this.rodarRelatorio();
  }

  rodarRelatorio() {
    this.relatorio_ok = false;
    this.api.getHorasVoadasPorDia(this.data).then(x => {
        this.previstas = x.Missao;
        this.cols = x.cols;
        this.relatorio_ok = true;
        this.dataDaConsulta = x.DataDaConsulta;
      })
      .catch(x => {

        this.relatorio_ok = true;
      })
  }

}
