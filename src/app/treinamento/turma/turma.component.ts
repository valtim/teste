import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Turma } from 'src/app/models/Turma';
import { HoraTurma } from 'src/app/models/HoraTurma';
import { PeriodoDeCurso } from 'src/app/models/PeriodoDeCurso';
import { ContadorDePeriodos } from 'src/app/models/ContadorDePeriodos';
import { TurmaAluno } from 'src/app/models/TurmaAluno';
import { MenuItem } from 'primeng/api';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';
import { GuidUtil } from 'src/app/shared/GuidUtil';
import { Message } from 'primeng/api';
import { PickList } from 'primeng/picklist';
import { TimeSpan } from 'src/app/shared/time-span-model';
import { Tripulante } from 'src/app/escala/dupla-adm/tripulante-model';


@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TurmaComponent implements OnInit, AfterViewInit {
  getTipoAnexo(tipo: string): any {
    return this.tiposDeAnexo.find(x => x.Sigla == tipo);
  }
  constructor(
    private api: ApiTurmasService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.usuarioLogado = {
      ehAdministrador: false,
      ehInstrutor: false
    };
  }

  get statusTurma(): MenuItem[] {
    if (this.turmaInterna != null)
      return this.turmaInterna.TurmaStatus.map(s => ({ label: s.Nome }));
  }



  ngOnInit(): void {




    this.api.getUsuarioLogadoComPermissoes(resp => {
      this.usuarioLogado = resp;

      this.instrutores = this.tripulantes.map(x => new Tripulante(x.Aluno));

      this.turmaInterna = Object.assign(new Turma(this.turma));
      this.turmaInterna.CargaHoraria = 0;
      if (this.turmaInterna.Deslocamentos)
        this.turmaInterna.Deslocamentos.forEach(x => {
          x.Data = new Date(x.Data);
        });

      this.periodo = this.turmaInterna.HorasTurma.map(a => new Date(a.Data));
      // this.alunos = this.turmaInterna.TurmaAluno.map(a => ({ Id: a.Aluno.Id, Trato: a.Aluno.Trato, CodigoANAC: a.Aluno.CodigoANAC, Cargo: a.Aluno.Cargo.Nome, Licenca: a.Aluno.Licenca, Confirmado: a.Confirmado, Avaliado: a.Avaliado, Notificado: a.Notificado, Nota: a.Nota, Email: a.Aluno.Email }));
      //this.tripulantes = this.tripulantes.map(x => new TurmaAluno(x));
      this.tripulantes = this.tripulantes.filter(x => this.turmaInterna.TurmaAluno.map(y => y.Aluno.Id).indexOf(x.Aluno.Id) == -1);

      if (this.turmaInterna.Treinamento) {
        this.turmaInterna.CargaHoraria = new TimeSpan(this.turmaInterna.Treinamento.CargaHoraria).TotalMinutes;
        this.turmaInterna.Treinamento = { Id: this.turmaInterna.Treinamento.Id, Nome: this.turmaInterna.Treinamento.Nome, CargaHoraria: this.turmaInterna.Treinamento.CargaHoraria };
      }

      if (this.turmaInterna.Instrutor) {
        this.turmaInterna.Instrutor = { Id: this.turmaInterna.Instrutor.Id, Trato: this.turmaInterna.Instrutor.Trato };
      }

      this.turmaInterna.PeriodosDeCurso.forEach(periodoDeCurso => {
        periodoDeCurso.Horas.forEach(hora => {
          let horaTurmaAssociada = this.turmaInterna.HorasTurma.filter(horaTurma => {
            return horaTurma.Id === hora.Id
          });
          if (horaTurmaAssociada.length == 1) {
            hora['Descricao'] = horaTurmaAssociada[0].Descricao;
            hora['ParaPagamento'] = horaTurmaAssociada[0].ParaPagamento;
          }
        });
      });
    });
  }

  // @ViewChild('picklist') picklist: PickList
  /*valtim*/
  @Input() turma: Turma;
  @Input() equipamentos = [];
  @Input() treinamentos = [];
  @Input() instrutores = [];
  @Input() tripulantes: TurmaAluno[];
  @Input() deslocamentos = [];
  @Input() tiposDeAnexo = [];

  @Output() evento = new EventEmitter<Object>();

  turmaInterna: Turma;

  periodo;
  comentario: string = '';

  linhasSelecionadas = [];

  anexosTreinamento = [];
  //alunos = [];
  //turmaAluno = [];
  PeriodosDeCurso: ContadorDePeriodos = new ContadorDePeriodos;
  periodosSomados: number = 0;
  // todasAsPessoas: any[];
  autoCompleteResults: any[];
  messages: Message[];


  enviar(turma: Turma) {

    this.messages = [];

    if (this.messages.length != 0)
      return;

    var errosDeslocamento: string[] = [];

    this.turmaInterna.Deslocamentos.forEach(x => {


      if (x.Deslocamento.Nome == '') {
        errosDeslocamento.push(`Há um deslocamento preenchido sem o percurso`);
      }

      if (!x.Tripulante) {
        errosDeslocamento.push(`Há um deslocamento preenchido sem o tripulante`);
      }

      if (!x.Definir && !x.Hora) {
        errosDeslocamento.push(`Há um deslocamento preenchido sem horário`);
      }

    })

    const erros = errosDeslocamento.map(x => ({ severity: 'error', summary: 'Erro:', detail: x }));

    if (errosDeslocamento.length > 0) {
      this.messageService.addAll(erros);
      return;
    }
    this.salvarTurma(turma, false);
  }

  salvarTurma(turma: Turma, fechar: boolean, notificarEnvolvidos = false) {

    if (turma.Treinamento == null) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário escolher um Treinamento` });
      return;
    }

    if (turma.InstrutorExterno) {
      turma.Instrutor = null;
    } else {
      if (turma.Instrutor == null) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário escolher um Instrutor` });
        return;
      }
    }

    if (this.turmaInterna.TurmaAluno.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário adicionar alunos na turma` });
      return;
    }
    //turma.TurmaAluno = [];

    if (this.turmaInterna.PeriodosDeCurso.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário adicionar as datas e horas de realização do curso` });
      return;
    }

    // this.alunos.forEach((aluno, index0) => {
    //   let ta = new TurmaAluno();
    //   ta.Aluno = aluno;
    //   ta.Confirmado = true;
    //   ta.Avaliado = aluno.Avaliado;
    //   ta.Nota = aluno.Nota;
    //   ta.Notificado = aluno.Notificado;
    //   turma.TurmaAluno.push(ta);

    //   if (index0 == (this.alunos.length - 1)) {
    //     // Alunos transformados



    //     // if (this.turmaInterna.CargaHoraria != this.periodosSomados) {
    //     //   this.messageService.add({ severity: 'error', summary: 'Erro', detail: `A carga horária programada do curso não confere com o carga horária do treinamento` });
    //     //   return;
    //     // }




    //     // Fim - Alunos transformados
    //   }
    // });

    if (this.comentario != '') {
      turma.TurmasComentarios.push({ Comentario: this.comentario, Usuario: this.usuarioLogado });
    }

    // 0001-01-01T00:00:00
    let dataInicio = 30000000999999;
    let dataInicioStr = '';

    // turma.Alunos = this.alunos;
    this.turmaInterna.Datas = [];
    this.turmaInterna.HorasTurma = [];

    this.turmaInterna.PeriodosDeCurso.forEach(x => {
      let dataStr = "";

      if (typeof x.Data == 'object')
        dataStr = x.Data.toISOString().split("T")[0];
      else
        dataStr = x.Data.split("T")[0];

      x.Horas.forEach(y => {
        this.turmaInterna.HorasTurma.push(
          Object.assign(new HoraTurma, ({
            Data: new Date(dataStr + "T" + "00:00"),
            HoraInicio: new Date(dataStr + "T" + y.HoraInicio),
            HoraTermino: new Date(dataStr + "T" + y.HoraTermino),
            ParaPagamento: y.ParaPagamento,
            Descricao: y.Descricao,
          }))
        )
      });

    });

    this.api.postTurma(new Turma(this.turmaInterna)).then(x => {
      this.messageService.add({ severity: 'success', summary: 'SOL', detail: `A turma foi salva com sucesso!` });
      this.evento.emit({ Turma: this.turmaInterna, Salvar: true, Fechar: fechar });
      this.turmaInterna.Novo = false;

      if (notificarEnvolvidos) {
        this.api.getNotificarEnvolvidos(this.turmaInterna.Id)
          .then(() => this.messageService.add({ severity: 'success', summary: 'SOL', detail: `As notificações foram enviadas com sucesso!` }))
          .catch(() => this.messageService.add({ severity: 'danger', summary: 'SOL', detail: `Erro ao enviar notificações` }));
      }


    }).catch(x => {
      console.log(x);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao Salvar` });
      // callback();
    });


  }



  mudeiAqui(e, dados) {
    dados.Modificado = true;
  }

  mudancaDeData(data) {
    if (this.turmaInterna.PeriodosDeCurso.filter(x => x.Data == data).length > 0)
      return;
    this.turmaInterna.PeriodosDeCurso.push(<PeriodoDeCurso>{ Data: data, Horas: [{ ParaPagamento: true }] });
  }

  mudancaDeDataDeDeslocamento(data) {
    if (this.turmaInterna.DatasDeDeslocamento.filter(x => x.getTime() == data.getTime()).length > 0)
      return;
    this.turmaInterna.DatasDeDeslocamento.push(data);
  }

  removerData(data) {
    this.turmaInterna.PeriodosDeCurso = this.turmaInterna.PeriodosDeCurso.filter(x => x.Data != data);
    this.calcularDiferenca();
    //this.atualizarStatusTurma(() => { });
  }

  removerDataDeslocamento(data) {
    if (this.turmaInterna.Deslocamentos.length > 0)
      this.turmaInterna.Deslocamentos = this.turmaInterna.Deslocamentos.filter(x => x.Data.getTime() != data.getTime());
    this.turmaInterna.DatasDeDeslocamento = this.turmaInterna.DatasDeDeslocamento.filter(x => x.getTime() != data.getTime());
  }

  // removerAluno(aluno) {
  //   this.alunos = this.alunos.filter(x => x.Id != aluno.Id);
  //   this.tripulantes.push(aluno);
  //   //this.atualizarStatusTurma(() => { });
  // }

  // moverAlunos() {
  //   // this.atualizarStatusTurma(() => { });
  // }

  // incluirTripulante(trip) {
  //   if (this.alunos.findIndex(x => x.Trato = trip.Trato) > -1)
  //     return;
  //   this.alunos.push(trip);
  //   var idxExcluir = this.tripulantes.findIndex(x => x.Trato == trip.Trato);
  //   if (idxExcluir > -1)
  //     this.tripulantes.splice(idxExcluir, 1);

  //   this.picklist.moveAllRight();
  // }
  novoDeslocamento() {
    if (this.turmaInterna.Deslocamentos == undefined)
      this.turmaInterna.Deslocamentos = [];
    this.turmaInterna.Deslocamentos.push({ Id: GuidUtil.NewGuid(), Data: new Date(), Deslocamento: { Nome: '' } });
  }

  excluirDeslocamento(id) {
    this.turmaInterna.Deslocamentos = this.turmaInterna.Deslocamentos.filter(x => x.Id != id);
  }

  onNotificar() {

    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      header: 'ATENÇÃO',
      message: 'É necessário salvar a turma antes de notificar. Deseja Salvar agora',
      icon: 'pi pi-exclamation-triangle',
      blockScroll: true,
      accept: () => {
        this.salvarTurma(this.turmaInterna, false, true);
        //this.evento.emit({ Turma: this.turmaInterna, Salvar: true, Fechar: true });
      },
      reject: (t) => {
        return;
      }
    });



  }



  avaliarAluno(aluno) {
    if (aluno.Nota != '') {
      aluno.Avaliado = true;
    }
  }

  removerHorario(periodo, id) {
    periodo.Horas = periodo.Horas.filter(x => x.Id != id);
    this.calcularDiferenca();
  }

  novaHora(data) {
    let dia = this.turmaInterna.PeriodosDeCurso.find(x => x.Data == data);
    dia.Horas.push(<HoraTurma>{ HoraInicio: '00:00', HoraTermino: '00:00', Descricao: '', ParaPagamento: true, });
    // this.atualizarStatusTurma(() => { });
  }


  buscar(event, lista, campo) {
    this.autoCompleteResults = lista.filter(x => x[campo].indexOf(event.query.toUpperCase()) > -1);
  }



  /*end valtim*/

  /* inicio guilherme */
  calcularDiferenca() {
    if (this.PeriodosDeCurso.Periodos != undefined && this.PeriodosDeCurso.Periodos.length > 0) {

      let soma1 = 0;
      this.PeriodosDeCurso.Periodos.forEach((periodo, index1) => {

        if (periodo.Horas != undefined && periodo.Horas.length > 0) {
          let soma2 = 0;
          periodo.Horas.forEach((hora, index2) => {

            if (hora.HoraInicio != undefined) {
              if (hora.HoraTermino != undefined) {
                let horaInicioStr = hora.HoraInicio.split(':');
                let horaTerminoStr = hora.HoraTermino.split(':');
                if (parseInt(horaInicioStr[0]) <= parseInt(horaTerminoStr[0])) {
                  let horas = parseInt(horaTerminoStr[0]) - parseInt(horaInicioStr[0]);
                  soma2 = soma2 + (horas * 60) - parseInt(horaInicioStr[1]) + parseInt(horaTerminoStr[1]);
                }
              }
            }
            if (index2 == (periodo.Horas.length - 1)) {
              soma1 = soma1 + soma2;
            }
          });
        }
        if (index1 == (this.PeriodosDeCurso.Periodos.length - 1)) {
          this.periodosSomados = soma1;
        }
      });
    } else {
      this.periodosSomados = 0;
    }
  }

  alterarHoraInicial(index, data, hora) {
    let periodos = this.PeriodosDeCurso.Periodos.filter(x => x.Data == data);
    if (periodos.length > 0) {
      periodos[0].Horas[index].HoraInicio = hora;
    } else {
      let horaTurma = Object.assign(new HoraTurma, ({ Data: data, HoraInicio: hora }));
      this.PeriodosDeCurso.Periodos.push(<PeriodoDeCurso>{ Data: data, Horas: [horaTurma] });
    }
    this.calcularDiferenca();
  }

  alterarHoraFinal(index, data, hora) {
    let periodos = this.PeriodosDeCurso.Periodos.filter(x => x.Data == data);
    if (periodos.length > 0) {
      if ((periodos[0].Horas[index]) && (periodos[0].Horas[index].HoraTermino)) {
        periodos[0].Horas[index].HoraTermino = hora;
      }
    } else {
      let horaTurma = Object.assign(new HoraTurma, ({ Data: data, HoraTermino: hora }));
      this.PeriodosDeCurso.Periodos.push(<PeriodoDeCurso>{ Data: data, Horas: [horaTurma] });
    }
    this.calcularDiferenca();
  }

  onInstrutorOptionsSelected(event) {
    // this.atualizarStatusTurma(() => { });
  }

  onTreinamentoOptionsSelected(event) {

    this.api.onLoading();
    this.turmaInterna.CargaHoraria = new TimeSpan(event.value.CargaHoraria).TotalMinutes;
    Object.assign(event.value, this.turmaInterna.Treinamento);
  }

  // atualizarStatusTurma(callback) {
  //   this.indexStatusTurma = 0;

  //   // Treinamento Agendado
  //   if (this.PeriodosDeCurso.Periodos.length > 0) {
  //     this.turmaInterna.TurmaStatus[0].Efetivada = true;
  //     this.turmaInterna.TurmaStatus[0].DataEvento = DataUtil.Agora();-
  //   } else {
  //     this.turmaInterna.TurmaStatus[0].Efetivada = false;
  //     this.turmaInterna.TurmaStatus[0].DataEvento = null;
  //   }

  //   // Instrutor Designado
  //   if ((this.turmaInterna.Instrutor != null) || (this.turmaInterna.Instrutor != undefined) || (this.turmaInterna.InstrutorExterno)) {
  //     this.turmaInterna.TurmaStatus[1].Efetivada = true;
  //     this.turmaInterna.TurmaStatus[1].DataEvento = DataUtil.Agora();
  //   } else {
  //     this.turmaInterna.TurmaStatus[1].Efetivada = false;
  //     this.turmaInterna.TurmaStatus[1].DataEvento = null;
  //   }

  //   // Alunos Matriculados
  //   if (this.alunos.length != 0) {
  //     this.turmaInterna.TurmaStatus[2].Efetivada = true;
  //     this.turmaInterna.TurmaStatus[2].DataEvento = DataUtil.Agora();
  //   } else {
  //     this.turmaInterna.TurmaStatus[2].Efetivada = false;
  //     this.turmaInterna.TurmaStatus[2].DataEvento = null;
  //   }

  //   // Envolvidos Notificados
  //   if (this.alunos.length != 0) {
  //     let todosEstaoNotificados = true;
  //     this.alunos.forEach((turmaAluno, index) => {

  //       if (!turmaAluno.Notificado) {
  //         todosEstaoNotificados = false;
  //       }

  //       if (index == (this.alunos.length - 1)) {
  //         // Continua verificacao

  //         if (todosEstaoNotificados) {
  //           this.turmaInterna.TurmaStatus[3].Efetivada = true;
  //           this.turmaInterna.TurmaStatus[3].DataEvento = DataUtil.Agora();
  //         } else {
  //           this.turmaInterna.TurmaStatus[3].Efetivada = false;
  //           this.turmaInterna.TurmaStatus[3].DataEvento = null;
  //         }

  //         // NRT Cadastrada
  //         if (this.turmaInterna.NRTs.length > 0) {
  //           this.turmaInterna.TurmaStatus[4].Efetivada = true;
  //           this.turmaInterna.TurmaStatus[4].DataEvento = DataUtil.Agora();
  //         } else {
  //           this.turmaInterna.TurmaStatus[4].Efetivada = false;
  //           this.turmaInterna.TurmaStatus[4].DataEvento = null;
  //         }

  //         if (this.turmaInterna.Concluido) {
  //           this.turmaInterna.TurmaStatus[5].Efetivada = true;
  //           this.turmaInterna.TurmaStatus[5].DataEvento = DataUtil.Agora();
  //         } else {
  //           this.turmaInterna.TurmaStatus[5].Efetivada = false;
  //           this.turmaInterna.TurmaStatus[5].DataEvento = null;
  //         }

  //         this.atualizarPassos(callback);
  //       }
  //     });
  //   } else {
  //     // NRT Cadastrada
  //     if (this.turmaInterna.NRTs.length > 0) {
  //       this.turmaInterna.TurmaStatus[4].Efetivada = true;
  //       this.turmaInterna.TurmaStatus[4].DataEvento = DataUtil.Agora();
  //     } else {
  //       this.turmaInterna.TurmaStatus[4].Efetivada = false;
  //       this.turmaInterna.TurmaStatus[4].DataEvento = null;
  //     }

  //     if (this.turmaInterna.Concluido) {
  //       this.turmaInterna.TurmaStatus[5].Efetivada = true;
  //       this.turmaInterna.TurmaStatus[5].DataEvento = DataUtil.Agora();
  //     } else {
  //       this.turmaInterna.TurmaStatus[5].Efetivada = false;
  //       this.turmaInterna.TurmaStatus[5].DataEvento = null;
  //     }

  //     this.atualizarPassos(callback);
  //   }

  // }

  uploadCompletoAnexos = (args: any): void => {
    this.turmaInterna.Anexos = args;
  }

  uploadCompletoSAEs = (args: any): void => {
    this.turmaInterna.SAEs = args;
  }

  uploadCompletoNECs = (args: any): void => {
    this.turmaInterna.NECs = args;
  }

  uploadCompletoNRTs = (args: any): void => {
    this.turmaInterna.NRTs = args;
    // this.atualizarStatusTurma(() => { });
  }

  // definirStatusTurma() {
  //   if ((this.turmaInterna.TurmaStatus == null) || (this.turmaInterna.TurmaStatus == undefined) || (this.turmaInterna.TurmaStatus.length == 0)) {
  //     this.turmaInterna.
  //   }

  //   this.statusTurma = this.turmaInterna.TurmaStatus.map(s => ({ label: s.Nome }));
  // }

  // atualizarPassos(callback) {
  //   this.concluirTreinamento = true;
  //   if ((this.turmaInterna.TurmaStatus == null) || (this.turmaInterna.TurmaStatus == undefined) || (this.turmaInterna.TurmaStatus.length == 0)) {
  //     callback();
  //   }

  //   this.turmaInterna.TurmaStatus.forEach((situacao, index) => {
  //     if (!situacao.Efetivada && (index < 5)) {
  //       this.concluirTreinamento = false;
  //     }

  //     this.checkPasso(situacao.Efetivada, index, situacao.DataEvento);

  //     if (index == (this.turmaInterna.TurmaStatus.length - 1)) {
  //       callback();
  //     }
  //   });
  // }

  indexStatusTurma: Number;


  cancelar(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'ATENÇÃO',
      message: 'Deseja Salvar antes de fechar?',
      icon: 'pi pi-exclamation-triangle',
      blockScroll: true,
      accept: () => {
        this.salvarTurma(this.turmaInterna, true);
        //this.evento.emit({ Turma: this.turmaInterna, Salvar: true, Fechar: true });
      },
      reject: (t) => {
        if (t == 2) {
          return;
        }
        this.evento.emit({ Salvar: false, Fechar: true });
      }
    });

  }


  confirm(event: Event) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Encerrando a turma, todos os alunos terão a data de validade atualizadas. \n Confirma encerramento?',
      icon: 'pi pi-exclamation-triangle',
      blockScroll: true,
      accept: () => {
        this.api.onLoading();
        this.turmaInterna.Concluido = true;
        this.salvarTurma(this.turmaInterna, true);
      },
      reject: () => {
        return;
      }
    });


    // this.atualizarStatusTurma(() => {
    //   this.salvarTurma(this.turmaInterna, true);
    // });
  }

  checkPasso(efetivado, index, data) {

    let valorData = '';
    if ((data != null) && (data != undefined) && (data != '') && (data != '0001-01-01T00:00:00')) {

      let dataStr = '';
      let horaStr = '';
      if (data instanceof Date) {
        dataStr = data.toISOString().split("T")[0];
        horaStr = data.toISOString().split("T")[1];
      } else {
        dataStr = data.split("T")[0];
        horaStr = data.split("T")[1];
      }

      valorData = dataStr.split("-")[2] + '/' + dataStr.split("-")[1] + '/' + dataStr.split("-")[0] +
        ' às ' + horaStr.split(":")[0] + ':' + horaStr.split(":")[1];
    }

    let li = document.querySelectorAll('p-steps > div > ul > li');
    let numero = li.item(index).querySelector('a > span.p-steps-number');

    if (efetivado) {
      if (!li.item(index).classList.contains("verde")) {
        li.item(index).classList.add('verde');
      }
      numero.innerHTML = '✓';
      this.indexStatusTurma = index;
    } else {
      if (li.item(index).classList.contains("verde")) {
        li.item(index).classList.remove('verde');
      }
      numero.innerHTML = (index + 1);
    }

    li.item(index).setAttribute('data-before-0' + index, valorData);
  }

  /* fim guilherme */


  mensagem = 'Cadastro realizado com sucesso';
  ID: string;
  aluno: any;
  status = [];
  localReservado: boolean;
  showNovoAluno = false;
  anexoNRT = false;
  display = false;
  showTimeTurma = false;
  localResults = [];
  results = [];
  anexos = [];
  nrts = [];
  diasTurma = [];
  horariosTurma = [];
  certAluno: any;
  certTreinamento: any;
  certShow = false;
  conteudos = [];
  perfisUsuario = [];
  treinamentoId: string;
  usuarioLogado: any;



  ngAfterViewInit(): void {
    // setTimeout(() => { this.atualizarPassos(() => { }); }, 0);
    this.cdr.detectChanges();
  }

}
