import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-rel-medicao',
  templateUrl: './rel-medicao.component.html',
  styleUrls: ['./rel-medicao.component.css']
})
export class RelMedicaoComponent {
  tudoPronto: boolean;
  filtroBase: any[];
  filtroClientes: any[];
  baseDeOperacaoSelecionada;
  clienteSelecionado;
  dataSelecionada: Date;
  prefixos: any[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.tudoPronto = false;
    this.api.getCombos().then(x => {
      let nova = [{ value: undefined, label: '' }];
      this.filtroBase = x.BaseDeOperacao;
      this.filtroClientes = x.Cliente;

      var date = new Date();
      //date.setDate(date.getDate() + 1);
      this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      this.prefixos = this.MOCK().Prefixos;

      this.rodarRelatorio();
    });
  }

  rodarRelatorio(){
    this.tudoPronto = true;    
  }


  /* Retirar quando backend ficar pronto */
  MOCK() {
    return {
      Prefixos: [
        {
          Prefixo: "EFX",
          Contrato: "5900.0111573.19.2",
          Base: "SBCB",
          Inicio: "2022-04-25T06:30:00",
          Fim: "2022-05-25T06:30:00",
          Dias: [
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'xxx',
              Backup: "PR-MRT",
              Base: "SBCB",
              Tempo: "01:52",
              CombustivelConsumido: 1529,
              TempoGlosada: "00:20",
              CombustivelAbastecido: 123,
              TempoFaturado: "01:32",
              Observacao: "",
              Periodo: "06:30 A 10:00",
              IndisponibilidadeDiaria: "03:30"
            },
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'INDISPONIVEL',
              Backup: "",
              Base: "SBCB",
              Tempo: "00:00",
              CombustivelConsumido: "0",
              TempoGlosada: "00:00",
              CombustivelAbastecido: null,
              TempoFaturado: null,
              Observacao: "",
              Periodo: "06:30 A 10:00",
              IndisponibilidadeDiaria: "03:30"
            },
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'xxx',
              Backup: "PR-MRT",
              Base: "SBCB",
              Tempo: "01:52",
              CombustivelConsumido: 1529,
              TempoGlosada: "00:20",
              CombustivelAbastecido: 123,
              TempoFaturado: "01:32",
              Observacao: "",
              Periodo: "",
              IndisponibilidadeDiaria: ""
            },
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'INDISPONIVEL',
              Backup: "",
              Base: "SBCB",
              Tempo: "00:00",
              CombustivelConsumido: "0",
              TempoGlosada: "00:00",
              CombustivelAbastecido: null,
              TempoFaturado: null,
              Observacao: "",
              Periodo: "06:30 A 10:00",
              IndisponibilidadeDiaria: "03:30"
            },
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'xxx',
              Backup: "PR-MRT",
              Base: "SBCB",
              Tempo: "01:52",
              CombustivelConsumido: 1529,
              TempoGlosada: "00:20",
              CombustivelAbastecido: 123,
              TempoFaturado: "01:32",
              Observacao: "",
              Periodo: "",
              IndisponibilidadeDiaria: ""
            }
          ]
        },
        
        {
          Prefixo: "NLN",
          Dias: [
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'xxx',
              Backup: "PR-MRT",
              Base: "SBCB",
              Tempo: "01:52",
              CombustivelConsumido: 1529,
              TempoGlosada: "00:20",
              CombustivelAbastecido: 123,
              TempoFaturado: "01:32",
              Observacao: "",
              Periodo: "06:30 A 10:00",
              IndisponibilidadeDiaria: "03:30"
            },
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'INDISPONIVEL',
              Backup: "",
              Base: "SBCB",
              Tempo: "00:00",
              CombustivelConsumido: "0",
              TempoGlosada: "00:00",
              CombustivelAbastecido: null,
              TempoFaturado: null,
              Observacao: "",
              Periodo: "06:30 A 10:00",
              IndisponibilidadeDiaria: "03:30"
            },
            {
              Data: '2023-04-27',
              FolhaDeBordo: 'xxx',
              Backup: "PR-MRT",
              Base: "SBCB",
              Tempo: "01:52",
              CombustivelConsumido: 1529,
              TempoGlosada: "00:20",
              CombustivelAbastecido: 123,
              TempoFaturado: "01:32",
              Observacao: "",
              Periodo: "",
              IndisponibilidadeDiaria: ""
            }
          ]
        }
      ],
      Indisponibilidade: [{
        Contrato: "5900.0111573.19.2",
        Estado: "INDISPONÍVEL",
        Inicio: "2022-04-25T06:30:00",
        Fim: "2022-04-25T06:30:00"
      }]
    };
  }
}
