import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-rel-vencimento-treinamento',
  templateUrl: './rel-vencimento-treinamento.component.html',
  styleUrls: ['./rel-vencimento-treinamento.component.css']
})
export class RelVencimentoTreinamentoComponent implements OnInit {
  dados: any[];
  titulo = 'Próximos Vencimentos';
  consulta_ok = false;
  vencimentoEditado = null;
  dataReferencia = new Date();

  constructor(private api: ApiService,) {

  }


  save() {
    this.api.postAtualizaVencimento(this.vencimentoEditado).then(() => {

      alert('Salvo com sucesso');

      this.dados[this.dados.findIndex(x => x.Id == this.vencimentoEditado.Id)] = { ...this.vencimentoEditado };

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
