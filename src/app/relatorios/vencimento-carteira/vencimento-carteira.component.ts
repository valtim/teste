import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api/sortevent';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-vencimento-carteira',
  templateUrl: './vencimento-carteira.component.html',
  styleUrls: ['./vencimento-carteira.component.css'],
  providers: [MessageService]
})
export class VencimentoCarteiraComponent implements OnInit {

  constructor(private api: ApiService, private messageService: MessageService) { }

  public tripulantes: any;
  public certificados: any;
  public vencimentos: any;
  public loading = true;
  public ultimosVoos: any;
  public vencimentoListToSave = [];

  public resultado;

  readonly DATE_FMT = 'dd/MMM/yyyy';


  scrollableCols;
  frozenCols;
  valores;

  @ViewChild('myDiv') myDiv: ElementRef;


  podeEditar = window.location.href.indexOf("readonly") == -1;


  public itemExibido: string;

  retornoCarteira(retorno) {

    console.log(retorno);


    if (!retorno.Confirmado)
      return;

      retorno.Display = false;
    this.api.postVencimento(retorno.Certificado).then(x => {      
      var item = this.valores.filter(y => y.Trato == x.Tripulante.Trato)[0][x.Certificado.Nome];
      item.Display = false;
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Confirmado', detail: 'Dados Salvos com Sucesso' });      
      item.ValorExibido = x.ValorExibido;
      item.Cor = x.Cor;
    }).catch
      (e => {
        
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: 'Erro ao salvar, verifique os dados.' });

      })



  }

  ehObjeto(value) {
    return typeof (value) == "object";
  }

  ngOnInit() {

    this.api.getQuadroDeTripulantes().then(result => {
      this.loading = false;
      this.resultado = result;
      this.valores = result.valores;
      this.scrollableCols = result.scrollableCols;
      this.frozenCols = result.frozenCols;
    });
  }
  reordenar(coluna) {

    alert(coluna);
  }
  // salvarVencimento() {
  //   if (this.vencimentoListToSave.length) {
  //     this.api.postVencimento(this.vencimentoListToSave)
  //       .then((response) => {
  //         this.vencimentoListToSave = [];
  //         document.getElementById('salvar').style.fill = '#000000';
  //       })
  //       .catch((e) => {
  //         alert('erro ao salvar vencimento\n' + e)

  //       });
  //   }
  // }

  comparaDatas(data1, data2): number {
    if (data1 == null || data1 == null)
      return -1;

    var dataConvertida1 = new Date(data1);
    var dataConvertida2 = new Date(data2);

    return (dataConvertida1 > dataConvertida2) ? 1 : -1;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;


      event.order == event.order * -1;

      if (typeof value1 == "object") {

        result = this.comparaDatas(value1.DataDeVencimento, value2.DataDeVencimento);
        return (event.order * result);
      }


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

      return (event.order * result);
    });
  }

  exibir(evento, item) {

    if (item.Display)
      return;

    item.Display = true;
  }

  exibirVoos(evento, item) {

    this.myDiv.nativeElement.innerHTML = "";
    item.UltimosVoos.forEach(x => {
      this.myDiv.nativeElement.innerHTML += "<a target='_new' href='/rel-rdv/" + x.NumeroDaFolha + "'>" + x.Data.substring(8, 10) + '/' + x.Data.substring(5, 7) + '/' + x.Data.substring(2, 4) + ' - ' + x.Prefixo + ' - ' + x.NumeroDaFolha + '</a><br/>'
    });

  }


}
