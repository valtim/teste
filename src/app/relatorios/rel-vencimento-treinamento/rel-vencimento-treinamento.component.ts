import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SortEvent } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';
import { Vencimento } from 'src/app/treinamento/editar-vencimento/vencimento-model';

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
  valorEditado: Vencimento;
  exibirModal: boolean;
  data: string;
  limiteEmMeses: number = 3;


  constructor(private api: ApiService, 
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) {

  }

  retornoCarteira(retorno) {

    if (!retorno.Confirmado) {
      this.valorEditado = undefined;
      return;
    }

    this.api.postAtualizaVencimento(retorno.Certificado).then(x => {
      var iTripulante = this.dados.findIndex(t => t.Tripulante.Id == x.Tripulante.Id);
      var iVencimento = this.dados[iTripulante].Vencimentos.findIndex(t => t.Certificado.Id == x.Certificado.Id);

      this.dados[iTripulante].Vencimentos[iVencimento] = new Vencimento(x);

      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Confirmado', detail: 'Dados Salvos com Sucesso' });
      this.valorEditado = undefined;
    }).catch
      (e => {
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: 'Erro ao salvar, verifique os dados.' });
      })
  }

  editarVencimento(valor: Vencimento) {
    this.valorEditado = valor;
    this.exibirModal = true;
  }

  rodarRelatorio() {
    this.consulta_ok = false;
    this.api.getProximosVencimentos(this.dataReferencia, this.limiteEmMeses).then(x => {
      this.dados = x.map(m => new Vencimento(m));
      this.consulta_ok = true;
    });
  }

  ngOnInit(): void {

    this.data = this.activatedRoute.snapshot.paramMap.get('data');

    if ( this.data != null)
      this.dataReferencia = new Date(this.data+'T03:00:00.000Z');

    this.rodarRelatorio();
  }

  customSort(event: SortEvent) {
    this.consulta_ok = false;
    event.data.sort((data1, data2) => {

      let fields = event.field.split('.');
      let value1 = data1[event.field];
      let value2 = data2[event.field];

      if (fields.length > 1) {
        value1 = data1[fields[0]][fields[1]];
        value2 = data2[fields[0]][fields[1]];
      }

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
