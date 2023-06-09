import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

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
  prefixoSelecionado: any;
  exibirPrefixos: boolean;
  indisponibilidade: any[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.tudoPronto = false;
    this.api.getCombos().then(x => {
      let nova = [{ value: undefined, label: '' }];
      this.filtroBase = x.BaseDeOperacao;
      this.filtroClientes = x.Cliente;

      /* Campos filtros */
      var date = new Date();
      this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), 1);      
      this.baseDeOperacaoSelecionada = this.filtroBase[0].Id;
      this.clienteSelecionado = this.filtroClientes[0].Id;

      this.rodarRelatorio();
    });
  }

  rodarRelatorio(){
    this.tudoPronto = false;

    /* Dados para consultar API */
    console.log(this.baseDeOperacaoSelecionada);
    console.log(this.clienteSelecionado);
    console.log(this.dataSelecionada);

    var filtro = {
      base : this.baseDeOperacaoSelecionada,
      cliente : this.clienteSelecionado,
      data : this.dataSelecionada,
    }


    this.api.postRelarioMedicao(filtro).then(dados => {

      this.prefixos = dados.Prefixos;
      this.indisponibilidade = dados.Indisponibilidade;
      this.prefixos.push({ Prefixo: 'DISPONIBILIDADE' });
      this.prefixoSelecionado = this.prefixos[0];
      this.exibirPrefixos = true;

      this.tudoPronto = true;
    });        
  }

  definirAbaSelecionada($event) {    
    if ($event.index == (this.prefixos.length - 1)) {
      this.exibirPrefixos = false;
    } else {
      this.exibirPrefixos = true;
      this.prefixoSelecionado = this.prefixos[$event.index];
    }    
  }

  /* Retirar quando backend ficar pronto */
  consultarAPI(): Promise<any> {    
    return new Promise(resolve => {
        resolve(this.MOCK());
    });
  }

  MOCK() {
    return {
      Prefixos: [
        {
          Prefixo: "EFX",
          Contrato: "5900.0111573.19.2",
          Base: "SBCB",
          Inicio: "2022-04-25T06:30:00",
          Fim: "2022-05-25T06:30:00",
          
          // Resumo
          TotalTempoFB:	'22:54',
          TotalBackUp: '00:00',
          TotalConsumoFB: '20409', // Libras
          TotalDowtime: '68:09',
          TotalTempoGlosado: '00:00:00',
          TempoTotalFaturado: '22:54:00',
          // Resumo

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
          
          Contrato: "5900.0111573.19.2",
          Base: "SBCB",
          Inicio: "2022-04-25T06:30:00",
          Fim: "2022-05-25T06:30:00",
          
          // Resumo
          TotalTempoFB:	'22:54',
          TotalBackUp: '00:00',
          TotalConsumoFB: '20409', // Libras
          TotalDowtime: '68:09',
          TotalTempoGlosado: '00:00:00',
          TempoTotalFaturado: '22:54:00',
          // Resumo

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
      Indisponibilidade: [
        {
          Contrato: "5900.0111573.19.2",
          Estado: "INDISPONÍVEL",
          Inicio: "2022-04-25T06:30:00",
          Fim: "2022-04-25T06:30:00"
        },
        {
          Contrato: "5900.0111573.19.2",
          Estado: "INDISPONÍVEL",
          Inicio: "2022-04-25T06:30:00",
          Fim: "2022-04-25T06:30:00"
        },
        {
          Contrato: "5900.0111573.19.2",
          Estado: "INDISPONÍVEL",
          Inicio: "2022-04-25T06:30:00",
          Fim: "2022-04-25T06:30:00"
        }
      ]
    };
  }
}
