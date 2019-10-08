import { Component, OnInit } from '@angular/core';
 import {  ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tratamento-da-fadiga',
  templateUrl: './tratamento-da-fadiga.component.html',
  styleUrls: ['./tratamento-da-fadiga.component.css']
})
export class TratamentoDaFadigaComponent implements OnInit {


  public tratamento: any;
  public historicos: any;
  public loading = false;   
  public exibirPesquisa = true;
  public liberado : boolean = false;
  public encerrado : boolean = false;

  public faseCoord : boolean = false;
  public faseChefe : boolean = false;
  public faseGerente : boolean = false;

  public mobile: boolean = false;

  public formOK: boolean = false;

  public resposta: any;

  constructor(
    private activatedRoute: ActivatedRoute
    , private api: ApiService
    , private app: AppComponent
    , public router: Router
    ) { }



    public id : string;




public acao :string;
public comentario : string;

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tratamentoFadiga(this.id);

    if (window.innerWidth < 500 ) { // 768px portrait
      this.mobile = true;
    }

  }


  postTratamento() {
    
    
    if ( this.faseCoord )
      this.formOK = ( this.resposta.Comentario.length > 0 && this.resposta.Avaliador.length > 0 );

    if ( this.faseChefe )
      this.formOK = this.resposta.Comentario.length > 0;

    if ( this.faseGerente )
      this.formOK = this.resposta.Comentario.length > 0;

  if (!this.formOK)
  {

      this.api.message = {
        show: true,
        type: 'error',
        title: 'Alerta',
        message: 'Preencha os campos Obrigatórios',
        //callBack: () => { this.router.navigate(['/fadiga/' + this.tratamento.Pesquisa.Data.substring(0,10)]); }
      };

      return;

  }


    this.loading = true;
    this.api.postTratamentoFadiga(this.tratamento.Pesquisa.Id, this.resposta).then(() => {
      this.loading = false;
      this.app.setTitle('Escala de Trabalho');
      //this.formatarDiario();
      this.api.message = {
        show: true,
        type: 'success',
        title: 'Sucesso',
        message: 'Tratamento Salvo com Sucesso.',
        callBack: () => { this.router.navigate(['/fadiga/' + this.tratamento.Pesquisa.Data.substring(0,10)]); }
      };
      
    }).catch(() => {
      this.loading = false;
      //this.formatarDiario();
      this.api.message = {
        show: true,
        type: 'error',
        title: 'Erro',
        message: 'Problemas ao salvar o diário.'
      };
    });
  }

  public tratamentoFadiga(id: string) {
    this.loading = true;
    this.api.getTratamentoFadiga(id).then((response) => {
      this.tratamento = response;
      this.loading = false;

      this.app.setVoltar('/fadiga/' + this.tratamento.Pesquisa.Data.substring(0,10));
      this.app.setTitle(this.tratamento.Trato);

      this.faseCoord = this.tratamento.Evento.Avaliacoes.length == 0;
      this.faseChefe = this.tratamento.Evento.Avaliacoes.length == 1;
      this.faseGerente = this.tratamento.Evento.Avaliacoes.length == 2;




      this.resposta = {
        Acao : '',
        Comentario : '',
        Liberado : 'false',
        Avaliador : ''
      }

      
      //this.formOK = ( this.resposta.Comentario.length >0  && this.resposta.Avaliador.length >0  );

      if ( this.tratamento.Evento.Avaliacoes.length == 2)
        this.resposta = {
          Acao : this.tratamento.Evento.Avaliacoes[0].Acao,
          Comentario : '',
          Liberado : this.tratamento.Evento.Avaliacoes[0].Liberado.toString(),
        }      

      this.encerrado = this.tratamento.Evento.Encerrada;
      this.liberado = this.tratamento.Evento.Liberado;
    });
  }

  

}
