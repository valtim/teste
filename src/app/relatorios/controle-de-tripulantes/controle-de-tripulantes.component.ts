import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

//import { ExcelService } from "./../../services/excel-service";

@Component({
  selector: 'app-controle-de-tripulantes',
  templateUrl: './controle-de-tripulantes.component.html',
  styleUrls: ['./controle-de-tripulantes.component.css'],
  //providers: [ExcelService]
})
export class ControleDeTripulantesComponent implements OnInit {
  carregando: boolean;
  dataInicio: Date;
  dataFim: Date;
  locale_pt: any;
  dados: any;
  filtroRetorno: any;
  cols: any;

  constructor(private api : ApiService) { }//, private excelService: ExcelService) { }

  ngOnInit(): void {

    this.api.getCombos().then(x => {
      
      this.carregando = false;
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() +1, 0);
    this.locale_pt = this.api.getLocale('pt');


    this.rodarRelatorio();

  }

  gerarExcel(){
    //this.excelService.exportAsExcelFile(this.cols.map(x=>x.header), this.dados, 'controle-de-tripulantes')
  }

  rodarRelatorio() {
    this.carregando = true;
    this.api.postRelControleDeHoras (
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
      }).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.carregando = false;
      })
  }

}
