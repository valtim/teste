import { ɵsetRootDomAdapter } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EscalaService } from 'src/app/shared/escala.service';
import { GuidUtil } from 'src/app/shared/GuidUtil';

@Component({
  selector: 'app-dupla-adm',
  templateUrl: './dupla-adm.component.html',
  styleUrls: ['./dupla-adm.component.css'],
  providers: [MessageService]
})
export class DuplaAdmComponent implements OnInit {
  dataFim: any;
  dataInicio: any;
  tripulantes: any;
  bases: any;
  incompatibilidades: any;
  listasOK: boolean;
  duplas: any;
  duplasExibidas: any;
  cursos: any;
  linhasSelecionadas = [];
  datas: any;


  dataSelecionada: any;

  filtrar(data){
    this.dataSelecionada = data;
    this.duplas.forEach(x=>x.Exibir = false);
    this.duplas.filter(x=>x.Data.toISOString() == data.toISOString()).forEach(x=>x.Exibir = true);
  }

  mudarDataInicio() {
    let base = this.dataInicio;
    let datas = this.getPrimeiroAndUtimo(base);

    this.dataInicio = datas.segunda;
    this.dataFim = datas.domingo;
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

  getPrimeiroAndUtimo(base: Date): { segunda: Date; domingo: Date; } {

    let segunda = base;
    while (segunda.getDay() != 1) {
      segunda = new Date(segunda.getFullYear(), segunda.getMonth(), segunda.getDate() - 1)
    }

    let domingo = new Date(segunda.getFullYear(), segunda.getMonth(), segunda.getDate() + 6)

    return { segunda, domingo };
  }


  rodarRelatorio() {

    this.duplas = [];


    this.apiEscala.getListasDupla(this.dataInicio).then(x => {
      this.tripulantes = x.tripulantes;
      this.bases = x.bases;
      this.incompatibilidades = x.incompatibilidades;
      //this.listarPendencias();

      this.apiEscala.getDuplasAdm(this.dataInicio, this.dataFim).then(x => {
        this.duplas = x.Duplas;
        this.datas = x.Datas.map(x => new Date(x));
        this.duplas.forEach(x => {
          x.Data = new Date(x.Data)
          x.Exibir = true;
        });
        this.filtrar(this.dataInicio);
        this.listasOK = true;
      })
    })
  }


  novaLinha() {

    this.duplas.unshift({
      Id: GuidUtil.NewGuid(),
      Base: null,
      Data: this.dataSelecionada,
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
      Exibir: true,
    });
  }

  salvar() {


    this.listasOK = false;
    let editado_novo = this.duplas.filter(x => x.Modificado && !x.Invalido);

    let duplasAndDeslocamentos = { data: this.dataInicio, duplas: editado_novo, deslocamentosDoDia: [] };

    this.apiEscala.postDuplas(duplasAndDeslocamentos).then(x => {
      // let novos = x.duplas;

      // novos.forEach(x => {
      //   x.Data = new Date(x.Data);
      //   x.PIC = this.tripulantes.find(y => y.Id == x.PIC.Id);
      //   if (x.SIC) x.SIC = this.tripulantes.find(y => y.Id == x.SIC.Id);
      // })

      // this.duplas = novos;

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });



      for (let i = 0; i < x.mensagensDeErro.length; i++)
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: x.mensagensDeErro[i] });


      this.listasOK = true;
    })
  }

  delete() {

    this.listasOK = false;
    let editado = this.duplas.filter(x => this.linhasSelecionadas.includes(x.Id));

    editado.forEach(x => x.Ativo = false);


    let valor = { data: this.dataInicio, duplas: editado, deslocamentosDoDia: null };

    this.apiEscala.postDuplas(valor).then(x => {

      this.duplas = this.duplas.filter(x => !this.linhasSelecionadas.includes(x.Id));

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });

      this.listasOK = true;
    })

  }


  constructor(
    private apiEscala: EscalaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


    let base = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let datas = this.getPrimeiroAndUtimo(base);

    this.dataInicio = datas.segunda;
    this.dataFim = datas.domingo;

    this.rodarRelatorio()
  }

}
