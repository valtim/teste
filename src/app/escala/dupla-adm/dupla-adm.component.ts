import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';
import { DataUtil } from 'src/app/shared/DataUtil';
import { EscalaService } from 'src/app/shared/escala.service';
import { GuidUtil } from 'src/app/shared/GuidUtil';

@Component({
  selector: 'app-dupla-adm',
  templateUrl: './dupla-adm.component.html',
  styleUrls: ['./dupla-adm.component.css'],
  providers: [MessageService]
})
export class DuplaAdmComponent implements OnInit {

  ehGerente: boolean;
  dataFim: any;
  dataInicio: any;
  bases: any;
  incompatibilidades: any;
  carregado: boolean = true;
  duplas: any;
  duplasExibidas: any;
  linhasSelecionadas = [];
  datas: any;
  prefixos: any;
  jaPesquisou = false;

  tripulantes: any;
  turmas: any;

  dataSelecionada: any;
  PorDia: any;

  linhaSelecionada;

  vencimentos;
  clientes: any;
  deslocamentos: any;

  getSeverity(value: number): string {
    if (value >= 75) return "success"
    if (value >= 65) return "info"
    if (value >= 50) return "warning"
    return "danger"
  }

  mudouAba(e) {
    this.dataSelecionada = this.datas[e];
    this.tripulantes = this.PorDia.find(x => DataUtil.paraDataISOdeString(x.Data) == DataUtil.paraDataISOdeString(this.dataSelecionada)).Tripulantes;
    // this.turmas = this.PorDia.find(x => DataUtil.paraDataISOdeString(x.Data) == DataUtil.paraDataISOdeString(this.dataSelecionada)).Turmas;
  }


  // filtrar(data) {
  //   this.dataSelecionada = data;


  //   this.tripulantes = this.PorDia.find(x => DataUtil.paraDataISOdeString(x.Data) == DataUtil.paraDataISOdeDate(data)).Tripulantes;
  //   this.turmas = this.PorDia.find(x => DataUtil.paraDataISOdeString(x.Data) == DataUtil.paraDataISOdeDate(data)).Turmas;
  //   this.duplas.forEach(x => x.Exibir = false);
  //   this.duplas.filter(x => DataUtil.paraDataISOdeString(x.Data) == DataUtil.paraDataISOdeDate(data)).forEach(x => x.Exibir = true);
  //   this.jaPesquisou = true;
  // }

  mudarDataInicio() {
    let base = this.dataInicio;
    let datas = this.getPrimeiroAndUtimo(base);

    this.dataInicio = datas.segunda;
    this.dataFim = datas.domingo;
  }

  mudeiApresentacao(dados) {

    dados.Modificado = true;
    this.apiEscala.postFinalDeJornada(DataUtil.TimeSpanURL(dados.Apresentacao)).then(x => {
      dados.UltimoCorte = x.UltimoCorte;
      dados.FinalDaJornada = x.FinalDaJornada;

      dados.Invalido = false;
      dados.Ativo = true;
    })
    this.mudeiAqui(null, dados, 'dupla');
  }

  mudeiAqui(e, dados, tipo) {

    if (tipo == 'deslocamento') {

      if (dados.Definir == false && dados.Hora == undefined)
        return;

      if (dados.Deslocamento == undefined)
        return;

      dados.Tripulante = { Id: dados.Tripulante.Id, Trato: dados.Tripulante.Trato };

    }




    if (tipo == 'deslocamento') {
      this.apigenerico.postGenerico('DeslocamentoDia', [dados])
        .then(() => this.messageService.add({ sticky: false, severity: 'success', summary: 'SOL Sistemas', detail: `Deslocamento Salvo` }))
        .catch(() => this.messageService.add({ sticky: false, severity: 'error', summary: 'SOL Sistemas', detail: `Erro ao salvar` }))
      return;
    }


    dados.Modificado = true;
    dados.Invalido = false;
    dados.Ativo = true;
    if (dados.SIC != null && dados.PIC == null) {
      this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Uma linha não pode ter SIC sem PIC, caso a linha só tenha um Tripulante coloque como PIC. Esta linha não será salva` });
      dados.Ativo = false;
      dados.Invalido = true;
    }


    dados.Descricao = this.getDescricao(dados, this.dataSelecionada);


    if (dados.Invalido == true)
      return;

    // if (tipo == 'dupla') {

    //   let dupla = Object.assign({}, dados);

    //   if (dupla.Apresentacao == undefined)
    //     return;

    //   dupla.PIC = dupla.PIC == null ? null : { Id: dupla.PIC.Id };
    //   dupla.SIC = dupla.SIC == null ? null : { Id: dupla.SIC.Id };

    //   // this.apigenerico.postGenerico('Dupla', [dupla])
    //   //   .then(() => {
    //   //     this.messageService.add({ sticky: false, severity: 'success', summary: 'SOL Sistemas', detail: `Escala Salva` })
    //   //     dupla.RepeteAte = undefined;
    //   //     dupla.Modificado = false;
    //   //   })
    //   //   .catch((e) => { this.messageService.add({ sticky: false, severity: 'error', summary: 'SOL Sistemas', detail: `Erro ao salvar` }) })
    //   // return;
    // }

  }

  getDescricao(linha, dataSelecionada: Date): string {
    let desc = [];

    if (linha.PIC && linha.SIC) {

      //tripulantes iguais nao pode



      if (linha.PIC.Id == linha.SIC.Id) {
        let mensagem = `Não é possível selecionar o mesmo tripulante para as duas posições`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: mensagem });
      }

      if (linha.PIC.Idade + linha.SIC.Idade > 120) {
        let mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos por superarem 120 anos na soma das idades`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: mensagem });
      }

      if (this.incompatibilidades.filter(x => (x.Tripulante1.Id == linha.PIC.Id && x.Tripulante2.Id == linha.SIC.Id) || (x.Tripulante2.Id == linha.PIC.Id && x.Tripulante1.Id == linha.SIC.Id)).length != 0) {
        let mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente`
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente` });
      }

      // let temVerde = linha.PIC.Bolinha == 'success' || linha.SIC.Bolinha == 'success';
      // let temVermelha = linha.PIC.Bolinha == 'danger' || linha.SIC.Bolinha == 'danger';

      // if (temVermelha && !temVerde) {
      //   let mensagem = 'Tripulante Vemelho deve fazer dupla com um tripulante VERDE';
      //   desc.push(mensagem);
      //   this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      // }

      if (linha.PIC.Bolinha == 'warning' && linha.SIC.Bolinha == 'warning') {
        let mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente, notifique o PILOTO CHEFE`;
        if (this.ehGerente)
          mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos pois PIC amarelo só pode voar com SIC amarelo mediante aprovação do PILOTO CHEFE`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'warn', summary: mensagem });
      }

      if (linha.PIC.Bolinha == 'warning' && linha.SIC.Bolinha == 'danger') {
        let mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente, notifique o PILOTO CHEFE`;
        if (this.ehGerente)
          mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos pois PIC amarelo só pode voar com SIC vermelho mediante aprovação do PILOTO CHEFE`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'warn', summary: mensagem });
      }

      if (linha.PIC.Bolinha == 'danger' && linha.SIC.Bolinha == 'warning') {
        let mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente`;
        if (this.ehGerente)
          mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos pois PIC vermelho só pode voar com SIC verde`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      }

      if (linha.PIC.Fadiga <= 50) {
        let mensagem = `Tripulante ${linha.PIC.Trato} não pode ser escalado pois a fadiga dele está em vermelho`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      }

      if (linha.SIC.Fadiga <= 50) {
        let mensagem = `Tripulante ${linha.SIC.Trato} não pode ser escalado pois a fadiga dele está em vermelho`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      }

      if (!linha.PIC.EhInstrutor && linha.SIC.SoVoaComInstrutor) {
        let mensagem = `Tripulantes ${linha.PIC.Trato} e ${linha.SIC.Trato} não podem ser escalados juntos pois ${linha.SIC.Trato} só pode voar com Instrutores`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      }

      if (linha.PIC.SemVooHa45Dias || linha.PIC.MenosDe50Horas || linha.PIC.MenosDe15Horas || linha.PIC.MenosDe3Pousos) {
        let mensagem = `O Tripulante ${linha.PIC.Trato} tem pendência de recência e só pode voar após "CHECK" com instrutor`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      }

      if (!linha.PIC.EhInstrutor && (linha.SIC.SemVooHa45Dias || linha.SIC.MenosDe50Horas || linha.SIC.MenosDe15Horas || linha.SIC.MenosDe3Pousos)) {
        let mensagem = `O Tripulante ${linha.SIC.Trato} tem pendência de recência e só pode voar após "CHECK" com instrutor`;
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      }
    }


    if (linha.PIC) {
      if (linha.PIC.Fadiga.filter(x => x.Data.split('T')[0] == linha.Data.toISOString().split('T')[0]).length > 0)
        desc.push(`FADIGA ${linha.PIC.Fadiga.filter(x => x.Data.split('T')[0] == linha.Data.toISOString().split('T')[0])[0].FadigaGravada}`)
      desc.push(`${linha.PIC.Trato} VENCIDO: ${linha.PIC.Vencimentos.filter(x => x.Cor == 'vermelho').length}`)
      desc.push(`VENCENDO: ${linha.PIC.Vencimentos.filter(x => x.Cor == 'amarelo').length}`)

      linha.Vencido = linha.PIC.Vencimentos.filter(x => x.DataDeVencimento >= dataSelecionada).length;
      linha.Vencendo = linha.PIC.Vencimentos.filter(x => x.DataDeVencimento >= dataSelecionada.setDate(dataSelecionada.getDate() + 30)).length;
    }
    if (linha.SIC) {
      if (linha.SIC.Fadiga.filter(x => x.Data.split('T')[0] == linha.Data.toISOString().split('T')[0]).length > 0)
        desc.push(`FADIGA ${linha.SIC.Fadiga.filter(x => x.Data.split('T')[0] == linha.Data.toISOString().split('T')[0])[0].FadigaGravada}`)
      desc.push(`${linha.SIC.Trato} VENCIDO: ${linha.SIC.Vencimentos.filter(x => x.Cor == 'vermelho').length}`)
      desc.push(`VENCENDO: ${linha.SIC.Vencimentos.filter(x => x.Cor == 'amarelo').length}`)
    }



    return desc.join(', ');
  }

  funExibe(linha) {
    linha.ExibirDetalhes = !linha.ExibirDetalhes;
  }

  jornadaNoturna(apresentacao: string): boolean {
    var hora = parseInt(apresentacao.split(':')[0]);
    return hora > 12;
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

    this.carregado = false;
    this.duplas = [];


    this.apiEscala.getListasDupla(this.dataInicio, this.dataFim).then(da => {
      //this.tripulantes = x.tripulantes;
      //da.retorno.forEach(x => x.data = new Date(x.data));
      //da.retorno.forEach(x => x.tripulantes.forEach(y => y.DataDeVencimento = new Date(y.DataDeVencimento)));


      this.PorDia = da.PorDia;
      this.datas = da.Datas;


      // this.duplas = da.Duplas;
      // this.datas = da.Datas.map(x => new Date(x));

      this.bases = da.Bases;
      this.incompatibilidades = da.Incompatibilidades;
      this.prefixos = da.Prefixos;
      this.clientes = da.Clientes;
      this.deslocamentos = da.Deslocamentos;
      this.PorDia = da.PorDia;

      if (!this.dataSelecionada) this.dataSelecionada = this.PorDia[0].Data;
      this.tripulantes = this.PorDia.find(x => DataUtil.paraDataISOdeString(x.Data) == DataUtil.paraDataISOdeString(this.dataSelecionada)).Tripulantes;
      this.carregado = true;
    })
      //})
      .catch((e) => {
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Erro ao acessar o site' });
        this.carregado = true;
      })
  }


  novaLinha() {

    this.PorDia.forEach(x => {
      if (x.Data == this.dataSelecionada) {
        x.Duplas.unshift({
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
          Ativo: true,
        });
      }
    })
  }


  novaLinhaDeslocamento() {
    this.PorDia.forEach(x => {
      if (x.Data == this.dataSelecionada) {
        x.DeslocamentosDoDia.unshift({
          Id: GuidUtil.NewGuid(),
          Data: this.dataSelecionada,
          Tripulante: null,
          Ativo: true,
          Hora: undefined,
          Definir: false,
          Deslocamento: undefined
        });
      }
    })
  }
  salvar() {


    this.carregado = false;

    let modificado = [];

    this.PorDia.forEach(x => {
      x.Duplas.filter(x => x.Modificado && !x.Invalido).forEach(y => modificado.push(Object.assign({}, y)));
    });

    //let editado_novo = this.duplas.filter(x => x.Modificado && !x.Invalido);

    modificado.forEach(x => {
      x.PIC = x.PIC == null ? null : { Id: x.PIC.Id };
      x.SIC = x.SIC == null ? null : { Id: x.SIC.Id };
    })



    let duplasAndDeslocamentos = { data: this.dataInicio, duplas: modificado, deslocamentosDoDia: [] };

    this.apiEscala.postDuplas(duplasAndDeslocamentos).then(x => {
      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
      this.carregado = true;
      modificado.forEach(x => {
        x.Modificado = false;
        x.RepeteAte = undefined;
      })
    }).catch(() => this.messageService.add({ severity: 'danger', summary: 'SOL Sistemas', detail: 'Erro ao salvar' }))
  }

  excluirDeslocamento(dados) {
    dados.Ativo = false;
    this.apigenerico.postGenerico('DeslocamentoDia', [dados])
      .then(() => this.messageService.add({ sticky: false, severity: 'success', summary: 'SOL Sistemas', detail: `Deslocamento Excluído` }))
      .catch(() => this.messageService.add({ sticky: false, severity: 'error', summary: 'SOL Sistemas', detail: `Erro ao salvar` }))
    return;

    alert();
    //this.deslocamentosDoDia = this.deslocamentosDoDia.filter(x => x.Id != id);
  }

  delete() {

    this.carregado = false;

    let paraExcluir = [];




    this.PorDia.forEach(x => {
      x.Duplas.filter(x => this.linhasSelecionadas.includes(x.Id)).forEach(y => {

        let todelete = Object.assign({}, y);
        todelete.PIC = !todelete.PIC ? undefined : { Id: todelete.PIC.Id };
        todelete.SIC = !todelete.SIC ? undefined : { Id: todelete.SIC.Id };
        todelete.Ativo = false;
        paraExcluir.push(todelete)

      });
    });



    let valor = { duplas: paraExcluir, deslocamentosDoDia: [] };

    this.apiEscala.postDuplas(valor).then(x => {

      //this.duplas = this.duplas.filter(x => !this.linhasSelecionadas.includes(x.Id));

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
      this.PorDia.forEach(x => {
        x.Duplas.filter(x => this.linhasSelecionadas.includes(x.Id)).forEach(y => y.Ativo = false);
      });
      this.linhasSelecionadas = [];
      this.carregado = true;
    })

  }


  constructor(
    private apiEscala: EscalaService,
    private messageService: MessageService,
    private apigenerico: ApiGenericoService,
    private router: Router,
  ) {
    this.ehGerente = this.router.url.indexOf('adm') > -1;
  }

  ngOnInit(): void {


    let base = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    let datas = this.getPrimeiroAndUtimo(base);

    this.dataInicio = base;
    this.dataFim = base;

    //this.rodarRelatorio()
  }

}
