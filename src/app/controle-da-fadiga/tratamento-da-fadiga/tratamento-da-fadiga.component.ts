import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-tratamento-da-fadiga',
  templateUrl: './tratamento-da-fadiga.component.html',
  styleUrls: ['./tratamento-da-fadiga.component.css']
})
export class TratamentoDaFadigaComponent implements OnInit {



  public titulo = "Tratamento";


  fg: UntypedFormGroup;

  public tratamento: any;
  public historicos: any;
  public loading = true;
  public exibirPesquisa = true;
  public liberado: boolean = false;
  public encerrado: boolean = false;

  public faseCoord: boolean = false;
  public faseChefe: boolean = false;
  public faseGerente: boolean = false;
  public faseGSO: boolean = false;

  //public ResponsavelEscala : any[];

  public mobile: boolean = false;

  public formOK: boolean = false;

  public resposta: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    public router: Router,
    private fb: UntypedFormBuilder
  ) { }



  dataString;

  public id: string;




  public acao: string;
  public comentario: string;

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tratamentoFadiga(this.id);

    if (window.innerWidth < 500) { // 768px portrait
      this.mobile = true;
    }



  }

  buildForm() {


    //let group = {}
    this.fg = new UntypedFormGroup({});
    this.fg.addControl('Comentario', new UntypedFormControl('', Validators.required));

    if (this.faseChefe || this.faseGerente) {

      this.fg.addControl('Liberado', new UntypedFormControl('', Validators.required));
      this.fg.addControl('Acao', new UntypedFormControl('', Validators.required));

      // this.fg.addControl('Liberado', new FormControl());
      // this.fg.addControl('Acao', new FormControl());



    }

    if (this.faseGerente) {

      this.fg.patchValue({
        Liberado: this.resposta.Liberado,
        Acao: this.resposta.Acao,
      });
    }

    if (this.faseGSO) {

      this.fg.addControl('Liberado', new UntypedFormControl());
      this.fg.patchValue({
        Liberado: this.resposta.Liberado,
        Comentario: this.resposta.Comentario,
      });
    }

    if (this.faseCoord)
      this.fg.addControl('ResponsavelEscala', new UntypedFormControl('', Validators.required));

    this.loading = false;

  }




  postTratamento() {

    this.resposta = Object.assign({}, this.fg.value);


    this.loading = true;
    this.api.postTratamentoFadiga(this.tratamento.Pesquisa.Id, this.resposta).then(() => {
      this.loading = false;
      alert('Tratamento Salvo com sucesso!');
      this.router.navigate(['/fadiga/' + this.tratamento.Pesquisa.Data.substring(0, 10)]);

    }).catch(() => {
      this.loading = false;
      //this.formatarDiario();
      this.api.message = {
        show: true,
        type: 'error',
        title: 'Erro',
        message: 'Problemas ao salvar o tratamento.'
      };
    });
  }

  public tratamentoFadiga(id: string) {
    this.loading = true;
    this.api.getTratamentoFadiga(id).then((response) => {

      this.dataString = "/fadiga/" + response.Pesquisa.Data.split('T')[0]
      this.tratamento = response;
      this.titulo = this.tratamento.Trato;

      this.encerrado = this.tratamento.Encerrada;
      this.liberado = this.tratamento.Liberado;

      if (this.tratamento.Status == "Apto") {
        this.loading = false;
        return;
      }

      this.resposta = {
        Acao: '',
        Comentario: '',
        Liberado: 'false',
        Avaliador: '',
        ResponsavelEscala: this.tratamento.ResponsavelEscala,
      }

      // if (this.tratamento.Pesquisa.ReporteVoluntario) {
      //   this.faseChefe = true;
      //   this.buildForm();
      //   return;
      // }

        this.faseCoord = this.tratamento.Avaliacoes.length == 0;
      this.faseChefe = this.tratamento.Avaliacoes.length == 1;
      this.faseGerente = this.tratamento.Avaliacoes.length == 2;
      this.faseGSO = this.tratamento.Avaliacoes.length == 3 && this.tratamento.Encerrada == false;

      if (this.tratamento.Pesquisa.ReporteVoluntario) {
        this.faseGerente = true;
        this.faseCoord = false;
        this.faseChefe = false;
        this.faseGSO = false;
      }


      if (this.tratamento.Avaliacoes.length == 2)
        this.resposta = {
          Acao: this.tratamento.Avaliacoes[0].Acao,
          Comentario: '',
          Liberado: this.tratamento.Avaliacoes[0].Liberado.toString(),
        }

      if (this.tratamento.Avaliacoes.length == 3)
        this.resposta = {
          Comentario: '',
          Liberado: this.tratamento.Avaliacoes[0].Liberado.toString(),
        }

      this.encerrado = this.tratamento.Encerrada;
      this.liberado = this.tratamento.Liberado;

      this.buildForm();
    })
    .catch((error) => {
        if ( error.status == 403 ){
          alert('Você não tem acesso para visualizar esta pesquisa');
          this.router.navigate(['/fadiga']);
        }
    });
  }



}
