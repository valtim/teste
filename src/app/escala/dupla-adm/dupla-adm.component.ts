import { ɵsetRootDomAdapter } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  dataFim: any;
  dataInicio: any;
  tripulantes: any;
  bases: any;
  incompatibilidades: any;
  carregado: boolean = false;
  duplas: any;
  duplasExibidas: any;
  cursos: any;
  linhasSelecionadas = [];
  datas: any;
  prefixos: any;


  exibeCursos = false;

  dataSelecionada: any;

  filtrar(data) {
    this.dataSelecionada = data;
    this.duplas.forEach(x => { x.Exibir = false; x.ExibirDetalhes = false; });
    this.duplas.filter(x => x.Data.toISOString() == data.toISOString()).forEach(x => x.Exibir = true);


    let dataStr = DataUtil.formatDateBR(data);

    this.cursos.forEach(x => x.Exibir = false);
    this.cursos.filter(x => x.DatasStr.includes(dataStr)).forEach(x => x.Exibir = true);

    this.exibeCursos = this.cursos.filter(x => x.DatasStr.includes(dataStr)).length > 0;
  }

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
  }

  mudeiAqui(e, dados) {


    dados.Invalido = false;
    dados.Ativo = true;
    if (dados.SIC != null && dados.PIC == null) {
      this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Uma linha não pode ter SIC sem PIC, caso a linha só tenha um Tripulante coloque como PIC. Esta linha não será salva` });
      dados.Ativo = false;
      dados.Invalido = true;
    }

    dados.Descricao = this.getDescricao(dados);


    dados.Modificado = true;
  }

  getDescricao(linha): string {
    let desc = [];

    if (linha.PIC && linha.SIC) {


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

      let temVerde = linha.PIC.Bolinha == 'verde' || linha.SIC.Bolinha == 'verde';
      // let temAmarela = linha.PIC.Bolinha != 'amarela' || linha.SIC.Bolinha != 'amarela';
      let temVermelha = linha.PIC.Bolinha == 'vermelha' || linha.SIC.Bolinha == 'vermelha';

      if ( temVermelha && !temVerde){
        let mensagem = 'Tripulante Vemelho deve fazer dupla com um tripulante VERDE';
        desc.push(mensagem);
        this.messageService.add({ sticky: true, severity: 'error', summary: mensagem });
      
      }

    }

    
    if (linha.PIC) {
      desc.push(`FADIGA ${linha.PIC.Fadiga.filter(x=>x.Data.split('T')[0] == linha.Data.toISOString().split('T')[0])[0].FadigaGravada}`)
      desc.push(`${linha.PIC.Trato} VENCIDO: ${linha.PIC.Vencimentos.filter(x => x.Cor == 'vermelho').length}`)
      desc.push(`VENCENDO: ${linha.PIC.Vencimentos.filter(x => x.Cor == 'amarelo').length}`)
    }
    if (linha.SIC) {
      desc.push(`FADIGA ${linha.SIC.Fadiga.filter(x=>x.Data.split('T')[0] == linha.Data.toISOString().split('T')[0])[0].FadigaGravada}`)
      desc.push(`${linha.SIC.Trato} VENCIDO: ${linha.SIC.Vencimentos.filter(x => x.Cor == 'vermelho').length}`)
      desc.push(`VENCENDO: ${linha.SIC.Vencimentos.filter(x => x.Cor == 'amarelo').length}`)
    }



    return desc.join(', ');
  }

  funExibe(linha) {
    linha.ExibirDetalhes = !linha.ExibirDetalhes;
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


    this.apiEscala.getListasDupla(this.dataInicio, this.dataFim).then(x => {
      this.tripulantes = x.tripulantes;
      this.bases = x.bases;
      this.incompatibilidades = x.incompatibilidades;
      this.prefixos = x.prefixos;

      this.apiEscala.getDuplasAdm(this.dataInicio, this.dataFim).then(x => {
        this.datas = x.Datas.map(x => new Date(x));
        this.duplas = x.Duplas;

        this.duplas.forEach(x => {
          if (x.PIC) {
            x.PIC = this.tripulantes.filter(y => y.Id == x.PIC.Id)[0]
          }

          if (x.SIC) {
            x.SIC = this.tripulantes.filter(y => y.Id == x.SIC.Id)[0]
          }
          x.Data = new Date(x.Data)
          x.Descricao = this.getDescricao(x);
          x.Exibir = true;
        });
        this.cursos = x.Cursos;
        this.filtrar(this.dataInicio);
        this.carregado = true;
      })
    })
      .catch(() => {
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Erro ao acessar o site' });
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


    this.carregado = false;
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


      this.carregado = true;
    })
  }

  delete() {

    this.carregado = false;
    let editado = this.duplas.filter(x => this.linhasSelecionadas.includes(x.Id));

    editado.forEach(x => x.Ativo = false);


    let valor = { data: this.dataInicio, duplas: editado, deslocamentosDoDia: null };

    this.apiEscala.postDuplas(valor).then(x => {

      this.duplas = this.duplas.filter(x => !this.linhasSelecionadas.includes(x.Id));

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });

      this.carregado = true;
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
