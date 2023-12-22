import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';
import { ApiService } from 'src/app/shared/api.service';
import { TimeSpan } from 'src/app/shared/time-span-model';
import { DiaMedicao } from './dia-medicao-model';
import { RelMedicao } from './rel-medicao-model';

@Component({
  selector: 'app-rel-medicao',
  templateUrl: './rel-medicao.component.html',
  styleUrls: ['./rel-medicao.component.css'],
  providers: [MessageService]
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
  locale_pt: any;

  constructor(private api: ApiService,
    private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
    this.tudoPronto = false;
    this.api.getCombosRestrito('BaseDeOperacao, Cliente').then(x => {
      let nova = [{ value: undefined, label: '' }];
      this.filtroBase = x.BaseDeOperacao;
      this.filtroClientes = x.Cliente;

      /* Campos filtros */
      var date = new Date();
      this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), 1);
      this.baseDeOperacaoSelecionada = this.filtroBase[0].Id;
      this.clienteSelecionado = this.filtroClientes[0].Id;

      this.tudoPronto = true;


      // this.rodarRelatorio();
    });
  }

  rodarRelatorio(xls: boolean = false) {
    this.tudoPronto = false;

    /* Dados para consultar API */
    console.log(this.baseDeOperacaoSelecionada);
    console.log(this.clienteSelecionado);
    console.log(this.dataSelecionada);

    var filtro = {
      base: this.baseDeOperacaoSelecionada,
      cliente: this.clienteSelecionado,
      data: this.dataSelecionada,
    }

    if (!xls) {

      this.api.postRelarioMedicao(filtro).then(dados => {

        this.prefixos = dados.Prefixos.map(x => new RelMedicao(x));


        // this.prefixos.forEach(x=> x.Dias = x.Dias.map(y=>new DiaMedicao(y)))

        this.indisponibilidade = dados.Indisponibilidade;
        this.prefixos.push({ Prefixo: 'DISPONIBILIDADE' });
        this.prefixoSelecionado = this.prefixos[0];
        this.exibirPrefixos = true;

        this.tudoPronto = true;
      });
      return;
    }

    this.api.postRelarioMedicaoXLS(filtro).then((x) => {
      this.downloadResponse(x);
    });

  }

  downloadResponse(res) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    let url = URL.createObjectURL(res.blob);
    a.href = url;
    a.download = res.fileName;
    a.click();
    window.URL.revokeObjectURL(url);

    this.tudoPronto = true;
  }


  definirAbaSelecionada($event) {
    if ($event.index == (this.prefixos.length - 1)) {
      this.exibirPrefixos = false;
    } else {
      this.exibirPrefixos = true;
      this.prefixoSelecionado = this.prefixos[$event.index];
    }
  }

  funLimpar(medicao: DiaMedicao) {
    medicao.TempoGlosada = new TimeSpan();
    this.funMudou(medicao);
  }


  funMudou(medicao: DiaMedicao) {


    let glosa = {
      Id: medicao.Id,
      TempoGlosada: medicao.TempoGlosada,
    }

    this.api.putGlosa(glosa).then(x => {
      this.messageService.add({ severity: 'success', summary: 'SOL', detail: `A Glosa de ${medicao.TempoGlosada} no dia ${new Date(medicao.Data).toLocaleDateString()} foi salva com sucesso!` });
    })
    .catch(() => {
      this.messageService.add({ severity: 'error', summary: 'SOL', detail: `Erro ao salvar a Glosa de ${medicao.TempoGlosada} no dia ${new Date(medicao.Data).toLocaleDateString()}` });
    });

  }

}
