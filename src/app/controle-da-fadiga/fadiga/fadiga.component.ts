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

  public buscaCompleta = false;
  public loading = false;
  public data: string;
  public fadigas = [];
  public tripulantes = [];
  public infoPesquisa = [];
  public historicos = [];
  private idPesquisa = '';
  public tratamento = {
    Texto: '',
    Liberado: null
  };


public pesquisa = {
  dataInicio : new Date().toISOString().split('T')[0],
  dataFim : new Date().toISOString().split('T')[0],
  basico : true,
  data : new Date().toISOString().split('T')[0],
  Niveis : ['0', '1', '2', '3'],
  Tripulantes : [],
};

mudarPesquisa(){
  this.pesquisa.basico = !this.pesquisa.basico;
}

  public info = false;
  // public pesquisa = true;

  public caminho;

  constructor(
    // 
    private api: ApiService,    
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    // this.app.setTitle('Fadiga');
    this.data = new Date().toISOString().split('T')[0];

    if ( this.activatedRoute.snapshot.paramMap.get('data') )
    {
      this.pesquisa.data = this.activatedRoute.snapshot.paramMap.get('data');
    }  
    // else
    // {
    //   this.searchFadiga();
    // }


    this.caminho = "/comunicar-tripulantes/"+ this.data
    this.searchFadiga();

  }

  searchFadiga() {
    this.loading = true;
    this.api.postGerenciaFadiga(this.pesquisa).then((response) => {
      this.fadigas = response.grid;
      this.tripulantes = response.Tripulantes;
      this.loading = false;


      this.pesquisa.Tripulantes = this.tripulantes.map(function(v){
        return v.Id;
    })
    }).catch(error => {
      this.loading = false;
    });
  }

  tratamentoFadiga(e) {
    this.loading = true;
    this.api.getTratamentoFadiga(e.target.parentElement.id).then((response) => {
      this.infoPesquisa = response.Resultado;
      this.historicos = response.Evento.Avaliacoes;
      this.idPesquisa = response.Evento.Pesquisa.Id;
      this.info = true;
      this.loading = false;
    });
  }

  closeTratamentoFadiga() {
    this.info = false;
  }

  teste(fadiga){

    if ( !fadiga.Evento)
      return; 

      this.router.navigate(['/tratamento-da-fadiga/' + fadiga.Id]);
  }

  
}
