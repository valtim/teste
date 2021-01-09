import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-vencimento-carteira',
  templateUrl: './vencimento-carteira.component.html',
  styleUrls: ['./vencimento-carteira.component.css']
})
export class VencimentoCarteiraComponent implements OnInit {

  constructor(private api: ApiService
    , private router: Router) { }

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


  retornoCarteira(retorno){

    console.log(retorno);


    if ( !retorno.Confirmado)
    return;

    
    this.api.postVencimento(retorno.Certificado).then(x=>{


      var item = this.valores.filter(y=>y.Trato == x.Tripulante.Trato)[0][x.Certificado.Nome];



      item.ValorExibido = x.ValorExibido;
      item.Cor = x.Cor;
      item.Display = false;
    })



  }

  ehObjeto(value){
    return typeof(value) == "object";
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

  salvarVencimento() {
    if (this.vencimentoListToSave.length) {
      this.api.postVencimento(this.vencimentoListToSave).then((response) => {
        this.vencimentoListToSave = [];
        document.getElementById('salvar').style.fill = '#000000';
      });
    }
  }

  exibir(evento, item){

    if ( item.Display)
      return;

    item.Display = true;
  }

}
