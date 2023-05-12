import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GuidUtil } from 'src/app/shared/GuidUtil';
import { EscalaService } from 'src/app/shared/escala.service';
import { DataUtil } from 'src/app/shared/DataUtil';

@Component({
  selector: 'app-dupla',
  templateUrl: './dupla.component.html',
  styleUrls: ['./dupla.component.css'],
  providers: [MessageService]
})
export class DuplaComponent implements OnInit {
  locale_pt: any;

  //tudoPronto = false;

  linhasSelecionadas = [];

  dataInicio;
  dataFim;
  duplas = [];
  tripulantes: any;
  bases: any;
  prefixos: any;
  resultsTripulante: any;
  resultsBase: any;
  resultsPrefixo: any;
  cursos: any;
  vencimentos: any;
  incompatibilidades: any;

  listasOK = false;
  duplasOK = false;
  deslocamentos: any[];
  deslocamentosDoDia: any;

  turnos = [
    { Id: 'M', Nome: 'Manhã' },
    { Id: 'T', Nome: 'Tarde' }
  ];

  exibeRestricao: boolean = false;
  restricoesProntas = false;
  clientes: any;

  constructor(private apiEscala: EscalaService,
    private messageService: MessageService) {
    //this.locale_pt = this.api.getLocale('pt');
    this.dataInicio = this.getAmanha();
    this.dataFim = this.getAmanha();



    this.rodarRelatorio();
  }

  getAmanha() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  }

  novoDeslocamento() {
    this.deslocamentosDoDia.push({ Id: GuidUtil.NewGuid(), Data: this.getAmanha(), Deslocamento: { Nome: '' }, Tripulante: { Trato: '' } });
  }

  excluirDeslocamento(id) {
    this.deslocamentosDoDia = this.deslocamentosDoDia.filter(x => x.Id != id);
  }

  mudarDataInicio() {
    this.dataFim = this.dataInicio;
  }
  mudeiApresentacao(dados) {

    dados.Modificado = true;
    this.apiEscala.postFinalDeJornada(DataUtil.TimeSpanURL(dados.Apresentacao)).then(x => {
      dados.UltimoCorte = x.UltimoCorte;
      dados.FinalDaJornada = x.FinalDaJornada;

      dados.Invalido = false;
      dados.Ativo = true;
    })
  }

  mudeiPrefixo(e, dados) {
    dados.Cliente = dados.Prefixo.Cliente;
    this.mudeiAqui(e, dados);
  }

  mudeiAqui(e, dados) {


    dados.Invalido = false;
    dados.Ativo = true;
    if (dados.SIC != null && dados.PIC == null) {
      this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Uma linha não pode ter SIC sem PIC, caso a linha só tenha um Tripulante coloque como PIC. Esta linha não será salva` });
      dados.Ativo = false;
      dados.Invalido = true;
    }

    if (dados.PIC && dados.SIC) {

      if (dados.PIC.Idade + dados.SIC.Idade > 120)
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Tripulantes ${dados.PIC.Trato} e ${dados.SIC.Trato} não podem ser escalados juntos por superarem 120 anos na soma das idades` });

      if (this.incompatibilidades.filter(x => (x.Tripulante1.Id == dados.PIC.Id && x.Tripulante2.Id == dados.SIC.Id) || (x.Tripulante2.Id == dados.PIC.Id && x.Tripulante1.Id == dados.SIC.Id)).length != 0)
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Tripulantes ${dados.PIC.Trato} e ${dados.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente` });

    }


    dados.Modificado = true;
  }

  rodarRelatorio() {

    // let vencimentos = false;
    // let duplas = false;


    this.listasOK = false;
    this.duplasOK = false;

    this.apiEscala.getListasDupla(this.dataInicio, this.dataFim).then(x => {
      this.tripulantes = x.tripulantes;
      this.bases = x.bases;
      this.prefixos = x.prefixos;
      this.incompatibilidades = x.incompatibilidades;
      this.deslocamentos = x.deslocamentos;
      this.deslocamentosDoDia = x.deslocamentosDoDia;
      this.clientes = x.clientes;
      // vencimentos = true;
      // this.tudoPronto = duplas && vencimentos;
      this.listasOK = true;
      //this.listarPendencias();

      this.apiEscala.getDuplas(this.dataInicio, this.dataFim).then(x => {
        this.duplas = x.Duplas;
        this.cursos = x.Cursos;
        this.deslocamentosDoDia = x.Deslocamentos;
        // duplas = true;
        // this.tudoPronto = duplas && vencimentos;
        this.duplasOK = true;

        this.duplas.forEach(x => {
          x.Data = new Date(x.Data);
        })
        if (this.deslocamentosDoDia != undefined)
          this.deslocamentosDoDia.forEach(x => {
            x.Data = new Date(x.Data);
          })


        this.apiEscala.getRestricoes(this.dataInicio, this.dataFim).then(x => {

          x.forEach(y => {
            this.tripulantes.find(z => z.Id == y.Id).Vencimentos = y.Vencimentos;
          })

          //this.tripulantes = x;
          this.restricoesProntas = true;
        })

        this.listarPendencias();
      });

    })

    // this.apiEscala.getVencimentos(this.dataInicio).then(x=>{
    //   this.vencimentos = x;
    //   vencimentos = true;
    //   this.tudoPronto = duplas && vencimentos;
    // })


  }
  listarPendencias() {
    if (!(this.listasOK || this.duplasOK))
      return;


    if (this.duplas != undefined)
      this.duplas.forEach(d => {
        if (d.PIC) d.PIC = this.tripulantes.filter(x => x.Id == d.PIC.Id)[0];
        if (d.SIC) d.SIC = this.tripulantes.filter(x => x.Id == d.SIC.Id)[0];
      })


  }

  ngOnInit(): void {
  }

  novaLinha() {

    this.duplas.unshift({
      Id: GuidUtil.NewGuid(),
      Base: null,
      Data: new Date(this.dataInicio.getFullYear(), this.dataInicio.getMonth(), this.dataInicio.getDate()),
      PIC: null,
      SIC: null,
      Apresentacao: null,
      Observacao: null,
      RepeteAte: null,
      InicioVoo: null,
      FimVoo: null,
      InicioDeslocamento: null,
      FimDeslocamento: null,
      Prefixo: null,
    });
  }

  print(){
    window.print();
  }

  salvar() {


    this.duplasOK = false;
    let editado_novo = this.duplas.filter(x => x.Modificado && !x.Invalido);

    // this.deslocamentosDoDia.forEach((x, i) => {
    //   x.Turno = x.Turno
    // });

    let duplasAndDeslocamentos = { data: this.dataInicio, duplas: editado_novo, deslocamentosDoDia: this.deslocamentosDoDia.filter(x => x.Modificado && !x.Invalido) };

    this.apiEscala.postDuplas(duplasAndDeslocamentos).then(x => {



      //this.duplas = x.duplas;
      this.deslocamentosDoDia = x.deslocamentosDoDia;


      let novos = x.duplas;

      novos.forEach(x => {
        x.Data = new Date(x.Data);
        x.PIC = this.tripulantes.find(y => y.Id == x.PIC.Id);
        if (x.SIC) x.SIC = this.tripulantes.find(y => y.Id == x.SIC.Id);
      })

      this.duplas = novos;

      //this.duplas.forEach(x => x.RepeteAte = undefined);

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });



      for (let i = 0; i < x.mensagensDeErro.length; i++)
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: x.mensagensDeErro[i] });


      this.duplasOK = true;
    })
  }

  delete() {

    this.duplasOK = false;
    let editado = this.duplas.filter(x => this.linhasSelecionadas.includes(x.Id));

    editado.forEach(x => x.Ativo = false);


    let valor = { data: this.dataInicio, duplas: editado, deslocamentosDoDia: this.deslocamentosDoDia.filter(x => x.Modificado && !x.Invalido) };

    this.apiEscala.postDuplas(valor).then(x => {

      this.duplas = this.duplas.filter(x => !this.linhasSelecionadas.includes(x.Id));

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });

      this.duplasOK = true;
    })

  }

  onRowEditInit(linha: any) {
    //this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(linha: any) {

  }

  onRowEditCancel(linha: any, index: number) {

  }

}
