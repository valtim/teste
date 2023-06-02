import { Component, OnInit } from '@angular/core';
import { MessageService, SortEvent } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-rel-vencimento-treinamento',
  templateUrl: './rel-vencimento-treinamento.component.html',
  styleUrls: ['./rel-vencimento-treinamento.component.css'],
  providers: [MessageService]
})
export class RelVencimentoTreinamentoComponent implements OnInit {
  dados: any[];
  titulo = 'Próximos Vencimentos';
  consulta_ok = false;
  vencimentoEditado = null;
  dataReferencia = new Date();

  messages;

  constructor(private api: ApiService,
    private messageService: MessageService) {

  }


  save() {


    let pedaco = this.vencimentoEditado.ValorExibido.split('/');

    let dia = this.vencimentoEditado.SomenteMes ? 1 : pedaco[0];
    let mes = this.vencimentoEditado.SomenteMes ? pedaco[0] - 1 : pedaco[1] - 1;
    let ano = this.vencimentoEditado.SomenteMes ? pedaco[1] : pedaco[2];
    let vencimento = new Date(ano, mes, dia);


    this.vencimentoEditado.DataDeVencimento = vencimento;

    this.api.postAtualizaVencimento(this.vencimentoEditado).then(() => {

      this.messageService.add({key: 'tc', severity:'success', summary: 'Salvo', detail: `Vencimento do Tripulante Salvos`});

      this.dados[this.dados.findIndex(x => x.Id == this.vencimentoEditado.Id)] = { ...this.vencimentoEditado };


      this.hide()

    }
    );

  }

  hide() {
    this.vencimentoEditado = undefined;
  }

  editarVencimento(data) {
    this.vencimentoEditado = { ...data };
  }

  rodarRelatorio() {
    this.consulta_ok = false;
    this.api.getProximosVencimentos(this.dataReferencia).then(x => {
      this.dados = x;
      this.consulta_ok = true;
    });
  }

  ngOnInit(): void {
    this.rodarRelatorio();
  }

  customSort(event: SortEvent) {
    this.consulta_ok = false;
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      this.consulta_ok = true;
      return (event.order * result);

    });

  }
}
