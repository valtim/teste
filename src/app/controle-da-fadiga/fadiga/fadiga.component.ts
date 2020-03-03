import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-fadiga',
  templateUrl: './fadiga.component.html',
  styleUrls: ['./fadiga.component.css']
})
export class FadigaComponent implements OnInit {

  //   public buscaCompleta = false;
  loadingDados = true;
  loadingPagina = true;
  data: string;
  fadigas = [];
  basico = true;
  tripulantes = [];
  niveis = [];
  registros = "";
  //   public infoPesquisa = [];
  //   public historicos = [];
  //   private idPesquisa = '';
  //   public tratamento = {
  //     Texto: '',
  //     Liberado: null
  //   };


  // public pesquisa = {
  //   dataInicio : new Date().toISOString().split('T')[0],
  //   dataFim : new Date().toISOString().split('T')[0],
  //   basico : true,
  //   data : new Date().toISOString().split('T')[0],
  //   Niveis : ['0', '1', '2', '3'],
  //   Tripulantes : [],
  // };

  // mudarPesquisa(){
  //   this.pesquisa.basico = !this.pesquisa.basico;
  // }

  public info = false;
  // public pesquisa = true;

  public caminho;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api : ApiService) { }

  ngOnInit() {
    // this.app.setTitle('Fadiga');
    this.data = new Date().toISOString().split('T')[0];

    if (this.activatedRoute.snapshot.paramMap.get('data')) {
      this.data = this.activatedRoute.snapshot.paramMap.get('data');
    }


    this.caminho = "/comunicar-tripulantes/" + this.data
    //this.searchFadiga();
    this.api.getTelaGerenciaDaFadiga().then(x => {
      // this.fadigas = x.Grid;
      this.tripulantes = x.Tripulantes;
      this.niveis = x.Niveis;
  
      this.loadingPagina = false;
    });
  }

  inicioDaPesquisa(retorno) {
    this.loadingDados = true;
    this.registros = "";
    this.data = retorno;

  }

  retornoDaPesquisa(retorno) {

    //console.log(retorno);
    this.fadigas = retorno;
    this.loadingDados = false;
    this.registros = "1 registro";
    if ( this.fadigas.length != 1)
      this.registros = this.fadigas.length + " registros";

  }


  // searchFadiga() {
  //   // this.loading = true;
  //   this.api.postGerenciaFadiga(this.pesquisa).then((response) => {
  //     this.fadigas = response.grid;
  //     this.tripulantes = response.Tripulantes;
  //     this.loading = false;


  //     this.pesquisa.Tripulantes = this.tripulantes.map(function(v){
  //       return v.Id;
  //   })
  //   }).catch(error => {
  //     this.loading = false;
  //   });
  // }

  // tratamentoFadiga(e) {
  //   this.loading = true;
  //   this.api.getTratamentoFadiga(e.target.parentElement.id).then((response) => {
  //     this.infoPesquisa = response.Resultado;
  //     this.historicos = response.Evento.Avaliacoes;
  //     this.idPesquisa = response.Evento.Pesquisa.Id;
  //     this.info = true;
  //     this.loading = false;
  //   });
  // }

  closeTratamentoFadiga() {
    this.info = false;
  }

  goTratamento(fadiga) {
    if (fadiga == "" || fadiga == undefined)
      return;
    this.router.navigate(['/tratamento-da-fadiga/' + fadiga]);
  }


}
