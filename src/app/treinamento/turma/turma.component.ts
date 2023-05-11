import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataUtil } from '../../shared/DataUtil';
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


@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TurmaComponent implements OnInit, AfterViewInit {


  @ViewChild('picklist') picklist : PickList
  /*valtim*/
  @Input() turma: Turma;
  @Input() equipamentos = [];
  @Input() treinamentos = [];
  @Input() instrutores = [];
  @Input() tripulantes = [];
  @Input() deslocamentos = [];

  @Output() evento = new EventEmitter<Object>();

  turmaInterna: Turma;

  periodo;
  comentario: string = '';

  linhasSelecionadas = [];

  anexosTreinamento = [];
  alunos = [];
  turmaAluno = [];
  PeriodosDeCurso: ContadorDePeriodos = new ContadorDePeriodos;
  periodosSomados: number = 0;
  todasAsPessoas: any[];
  autoCompleteResults: any[];
  messages: Message[];

  enviar(turma: Turma) {

    this.messages = [];

    if (typeof turma.Equipamento === 'string') {
      this.messages.push({ severity: 'error', summary: 'Erro:', detail: `O Equipamento ${turma.Equipamento} não está cadastrado no banco. Por favor confira antes de Salvar` });
    }

    if (typeof turma.Instrutor === 'string' && !turma.InstrutorExterno) {
      this.messages.push({ severity: 'error', summary: 'Erro:', detail: `O Instrutor ${turma.Instrutor} não está cadastrado no banco. Por favor confira antes de Salvar` });
    }

    if (this.messages.length != 0)
      return;

    if (typeof turma.Treinamento === 'string') {

      if (typeof turma.Treinamento === 'string')
        this.confirmationService.confirm({
          //target: event.target,
          message: `O treinamento ${turma.Treinamento} não está cadastrado no banco. Confirma cadastramento de um novo trenamento?`,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {

            var novoTreinamento = { "Id": GuidUtil.NewGuid(), Nome: turma.Treinamento };
            this.api.postTreinamento({ "Id": GuidUtil.NewGuid(), Nome: turma.Treinamento })
              .then(x => {
                turma.Treinamento = novoTreinamento;
              })


            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          },
          reject: () => {
            return;
          }
        });
    }

    this.salvarTurma(turma, () => { });
  }

  salvarTurma(turma: Turma, callback) {

    // if (turma.Equipamento == null) {
    //   this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário escolher um Equipamento` });
    //   return;
    // }    

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

    if (this.alunos.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário adicionar alunos na turma` });
      return;
    }
    turma.TurmaAluno = [];
    this.alunos.forEach((aluno, index0) => {
      let ta = new TurmaAluno();
      ta.Aluno = aluno;
      ta.Confirmado = true;
      ta.Avaliado = aluno.Avaliado;
      ta.Nota = aluno.Nota;
      ta.Notificado = aluno.Notificado;
      turma.TurmaAluno.push(ta);

      if (index0 == (this.alunos.length - 1)) {
        // Alunos transformados

        if (this.turmaInterna.PeriodosDeCurso.length == 0) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Antes de Salvar é necessário adicionar as datas e horas de realização do curso` });
          return;
        }

        // if (this.turmaInterna.CargaHoraria != this.periodosSomados) {
        //   this.messageService.add({ severity: 'error', summary: 'Erro', detail: `A carga horária programada do curso não confere com o carga horária do treinamento` });
        //   return;
        // }

        if (this.comentario != '') {
          turma.TurmasComentarios.push({ Comentario: this.comentario, Usuario: this.usuarioLogado });
        }

        // 0001-01-01T00:00:00
        let dataInicio = 30000000999999;
        let dataInicioStr = '';

        turma.Alunos = this.alunos;
        turma.Datas = [];
        turma.HorasTurma = [];

        this.turmaInterna.PeriodosDeCurso.forEach(x => {
          let dataStr = "";

          if (typeof x.Data == 'object')
            dataStr = x.Data.toISOString().split("T")[0];
          else
            dataStr = x.Data.split("T")[0];

          x.Horas.forEach(y => {
            turma.HorasTurma.push(
              Object.assign(new HoraTurma, ({
                Data: new Date(dataStr + "T" + "00:00"),
                HoraInicio: new Date(dataStr + "T" + y.HoraInicio),
                HoraTermino: new Date(dataStr + "T" + y.HoraTermino)
              }))
            )
          });

        });

        this.api.postTurma(turma).then(x => {
          Object.assign(this.turmaInterna, x);
          this.evento.emit(this.turmaInterna);
          callback();
        }).catch(x => {
          console.log(x);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao Salvar` });
          callback();
        });


        // Fim - Alunos transformados
      }
    });
  }

  cancelar() {
    this.statusTurma = [];
    this.turmaInterna.Cancelado = true;
    this.evento.emit(this.turmaInterna);
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
    this.atualizarStatusTurma(() => { });
  }

  removerDataDeslocamento(data) {
    if (this.turmaInterna.Deslocamentos.length > 0)
      this.turmaInterna.Deslocamentos = this.turmaInterna.Deslocamentos.filter(x => x.Data.getTime() != data.getTime());
    this.turmaInterna.DatasDeDeslocamento = this.turmaInterna.DatasDeDeslocamento.filter(x => x.getTime() != data.getTime());
  }

  removerAluno(aluno) {
    this.alunos = this.alunos.filter(x => x.Id != aluno.Id);
    this.tripulantes.push(aluno);
    this.atualizarStatusTurma(() => { });
  }

  moverAlunos() {
    this.atualizarStatusTurma(() => { });
  }

  incluirTripulante(trip) {
    if (this.alunos.findIndex(x => x.Trato = trip.Trato) > -1)
      return;
    this.alunos.push(trip);
    var idxExcluir = this.tripulantes.findIndex(x => x.Trato == trip.Trato);
    if (idxExcluir > -1)
      this.tripulantes.splice(idxExcluir, 1);

      this.picklist.moveAllRight();
      // this.picklist.resetFilter();
      // this.picklist.target = this.alunos;
  }

  /*
  this.confirmationService.confirm({
      target: e,
      message: 'Você deseja incluir todos os alunos?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        return;
        //this.picklist.moveAllRight();
        //this.atualizarStatusTurma(() => {});
      },
      reject: () => { return; }
    });

  confirmaInclusao(e) {
    if (e.value.length != 1)
      return;

    var trip = e.value[0];
  }
  */

  // onInstrutorExterno() {
  //   this.api.onLoading();
  //   if (!this.turmaInterna.InstrutorExterno) {
  //     this.api.getInstrutoresByTreinamento(this.turmaInterna.Treinamento.Id)
  //       .then(resp => {
  //         if (resp.Instrutores.length > 0) {
  //           this.instrutores = resp.Instrutores;
  //         } else {
  //           this.instrutores = [];
  //         }
  //         this.atualizarStatusTurma(() => {
  //           this.api.onLoading();
  //         });
  //       });
  //   } else {
  //     this.api.getInstrutores()
  //       .then(resp => {
  //         this.instrutores = resp.Instrutores;
  //         this.atualizarStatusTurma(() => {
  //           this.api.onLoading();
  //         });
  //       });
  //   }
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
    let nomeTreinamento = 'Não identificado';
    if ((this.turmaInterna.Treinamento != undefined) && (this.turmaInterna.Treinamento != null)) {
      nomeTreinamento = this.turmaInterna.Treinamento.Nome;
    }
    let local = 'Não identificado';
    if ((this.turmaInterna.Local != undefined) && (this.turmaInterna.Local != null) && (this.turmaInterna.Local != '')) {
      local = this.turmaInterna.Local;
    }
    let inicioTreinamento = 'Não identificado';
    if ((this.turmaInterna.DataDeInicio != undefined) && (this.turmaInterna.DataDeInicio != null)) {
      inicioTreinamento = new Date(this.turmaInterna.DataDeInicio).toLocaleDateString();
    }

    this.alunos.forEach((item, index) => {
      item['inicioTreinamento'] = inicioTreinamento;
      item['nomeTreinamento'] = nomeTreinamento;
      item['local'] = local;
      const envolvido = this.createEmailJson(item);
      this.api.postNotificarEnvolvidoTurma(envolvido).then(_ => _);
      item.Notificado = true;

      if (index == (this.alunos.length - 1)) {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Notificação feita' });
        this.atualizarStatusTurma(() => { });
      }
    });
  }

  createEmailJson(envolvido) {

    let html = `<h1>Olá ${envolvido.Trato}</h1>`;
    html += `<p>Você foi matriculado no treinamento <b>${envolvido.nomeTreinamento}</b> `;
    html += `que ocorrerá em <b>${envolvido.local}</b> `;
    html += `no dia <b>${envolvido.inicioTreinamento}</b>.</p>`;
    html += `<p>Atenciosamente, Setor de Treinamentos.</p>`;

    const envolvidoJson = {
      'To': envolvido.Email,
      'Subject': `Treinamento: ${envolvido.nomeTreinamento}`,
      'HTML': html,
      'Cliente': "Bristow"
    };

    return envolvidoJson;
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
    this.atualizarStatusTurma(() => { });
  }


  buscar(event, lista, campo) {
    this.autoCompleteResults = lista.filter(x => x[campo].indexOf(event.query.toUpperCase()) > -1);
  }

  funCalcularHoras() {
    //alert();
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
      periodos[0].Horas[index].HoraTermino = hora;
    } else {
      let horaTurma = Object.assign(new HoraTurma, ({ Data: data, HoraTermino: hora }));
      this.PeriodosDeCurso.Periodos.push(<PeriodoDeCurso>{ Data: data, Horas: [horaTurma] });
    }
    this.calcularDiferenca();
  }

  // onEquipamentoOptionsSelected(event) {
  //   this.api.onLoading();
  //   this.api.getTreinamentosByEquipamento(event.value.Id)
  //     .then(resp => {
  //       if (resp.Treinamentos.length > 0) {
  //         this.instrutores = resp.Instrutores;
  //         this.treinamentos = resp.Treinamentos;
  //       } else {
  //         this.instrutores = [];
  //         this.treinamentos = [];
  //       }
  //       this.api.onLoading();
  //     });
  // }

  onInstrutorOptionsSelected(event) {
    this.atualizarStatusTurma(() => { });
  }

  onTreinamentoOptionsSelected(event) {

    this.api.onLoading();
    this.turmaInterna.CargaHoraria = DataUtil.horaToMinuto(event.value.CargaHoraria);
    Object.assign(event.value, this.turmaInterna.Treinamento);

    // this.api.getInstrutoresByTreinamento(event.value.Id)
    //   .then(resp => {
    //     if (resp.Instrutores.length > 0) {
    //       this.instrutores = resp.Instrutores;
    //     } else {
    //       this.instrutores = [];
    //     }
    //     this.api.onLoading();
    //   });
  }

  atualizarStatusTurma(callback) {

    this.indexStatusTurma = 0;

    // Treinamento Agendado
    if (this.PeriodosDeCurso.Periodos.length > 0) {
      this.turmaInterna.TurmaStatus[0].Efetivada = true;
      this.turmaInterna.TurmaStatus[0].DataEvento = DataUtil.Agora();
    } else {
      this.turmaInterna.TurmaStatus[0].Efetivada = false;
      this.turmaInterna.TurmaStatus[0].DataEvento = null;
    }

    // Instrutor Designado
    if ((this.turmaInterna.Instrutor != null) || (this.turmaInterna.Instrutor != undefined) || (this.turmaInterna.InstrutorExterno)) {
      this.turmaInterna.TurmaStatus[1].Efetivada = true;
      this.turmaInterna.TurmaStatus[1].DataEvento = DataUtil.Agora();
    } else {
      this.turmaInterna.TurmaStatus[1].Efetivada = false;
      this.turmaInterna.TurmaStatus[1].DataEvento = null;
    }

    // Alunos Matriculados
    if (this.alunos.length != 0) {
      this.turmaInterna.TurmaStatus[2].Efetivada = true;
      this.turmaInterna.TurmaStatus[2].DataEvento = DataUtil.Agora();
    } else {
      this.turmaInterna.TurmaStatus[2].Efetivada = false;
      this.turmaInterna.TurmaStatus[2].DataEvento = null;
    }

    // Envolvidos Notificados
    if (this.alunos.length != 0) {
      let todosEstaoNotificados = true;
      this.alunos.forEach((turmaAluno, index) => {

        if (!turmaAluno.Notificado) {
          todosEstaoNotificados = false;
        }

        if (index == (this.alunos.length - 1)) {
          // Continua verificacao

          if (todosEstaoNotificados) {
            this.turmaInterna.TurmaStatus[3].Efetivada = true;
            this.turmaInterna.TurmaStatus[3].DataEvento = DataUtil.Agora();
          } else {
            this.turmaInterna.TurmaStatus[3].Efetivada = false;
            this.turmaInterna.TurmaStatus[3].DataEvento = null;
          }

          // NRT Cadastrada
          if (this.turmaInterna.NRTs.length > 0) {
            this.turmaInterna.TurmaStatus[4].Efetivada = true;
            this.turmaInterna.TurmaStatus[4].DataEvento = DataUtil.Agora();
          } else {
            this.turmaInterna.TurmaStatus[4].Efetivada = false;
            this.turmaInterna.TurmaStatus[4].DataEvento = null;
          }

          if (this.turmaInterna.Concluido) {
            this.turmaInterna.TurmaStatus[5].Efetivada = true;
            this.turmaInterna.TurmaStatus[5].DataEvento = DataUtil.Agora();
          } else {
            this.turmaInterna.TurmaStatus[5].Efetivada = false;
            this.turmaInterna.TurmaStatus[5].DataEvento = null;
          }

          this.atualizarPassos(callback);
        }
      });
    } else {
      // NRT Cadastrada
      if (this.turmaInterna.NRTs.length > 0) {
        this.turmaInterna.TurmaStatus[4].Efetivada = true;
        this.turmaInterna.TurmaStatus[4].DataEvento = DataUtil.Agora();
      } else {
        this.turmaInterna.TurmaStatus[4].Efetivada = false;
        this.turmaInterna.TurmaStatus[4].DataEvento = null;
      }

      if (this.turmaInterna.Concluido) {
        this.turmaInterna.TurmaStatus[5].Efetivada = true;
        this.turmaInterna.TurmaStatus[5].DataEvento = DataUtil.Agora();
      } else {
        this.turmaInterna.TurmaStatus[5].Efetivada = false;
        this.turmaInterna.TurmaStatus[5].DataEvento = null;
      }

      this.atualizarPassos(callback);
    }

  }

  uploadCompleto = (args: any): void => {
    this.atualizarStatusTurma(() => { });
  }

  definirStatusTurma() {
    if ((this.turmaInterna.TurmaStatus == null) || (this.turmaInterna.TurmaStatus == undefined) || (this.turmaInterna.TurmaStatus.length == 0)) {
      this.turmaInterna.TurmaStatus = [
        {
          Ordem: 1,
          Nome: 'Treinamento Agendado',
          DataEvento: null,
          Efetivada: false
        },
        {
          Ordem: 2,
          Nome: 'Instrutor Designado',
          DataEvento: null,
          Efetivada: false
        },
        {
          Ordem: 3,
          Nome: 'Alunos Matriculados',
          DataEvento: null,
          Efetivada: false
        },
        {
          Ordem: 4,
          Nome: 'Envolvidos Notificados',
          DataEvento: null,
          Efetivada: false
        },
        {
          Ordem: 5,
          Nome: 'NRT Cadastrada',
          DataEvento: null,
          Efetivada: false
        },
        {
          Ordem: 6,
          Nome: 'Treinamento Concluído',
          DataEvento: null,
          Efetivada: false
        }
      ];
    }

    this.statusTurma = this.turmaInterna.TurmaStatus.map(s => ({ label: s.Nome }));
  }

  atualizarPassos(callback) {
    this.concluirTreinamento = true;
    if ((this.turmaInterna.TurmaStatus == null) || (this.turmaInterna.TurmaStatus == undefined) || (this.turmaInterna.TurmaStatus.length == 0)) {
      callback();
    }

    this.turmaInterna.TurmaStatus.forEach((situacao, index) => {
      if (!situacao.Efetivada && (index < 5)) {
        this.concluirTreinamento = false;
      }

      this.checkPasso(situacao.Efetivada, index, situacao.DataEvento);

      if (index == (this.turmaInterna.TurmaStatus.length - 1)) {
        callback();
      }
    });
  }

  indexStatusTurma: Number;
  concluirTreinamento: boolean = false;

  onConcluirTreinamento() {
    this.api.onLoading();
    this.turmaInterna.Concluido = true;
    this.atualizarStatusTurma(() => {
      this.salvarTurma(this.turmaInterna, () => {
        this.api.onLoading();
      });
    });
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
  statusTurma: MenuItem[];

  STATUS_TURMA = {
    INSTRUTOR_DESIGNADO: 'Instrutor designado',
    LOCAL_RESERVADO: 'Local do treinamento já foi reservado',
    NRT_CADASTRADA: 'NRT cadastrada',
    NOTIFICACAO_ENVIADA: 'Notificação aos envolvidos',
    TREINAMENTO_ENVIADO_VALIDACAO: 'Treinamento enviado para validação',
    CONCLUSAO: 'Conclusão'
  };

  constructor(
    private confirmationService: ConfirmationService,
    private api: ApiTurmasService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService) {
    this.usuarioLogado = {
      ehAdministrador: false,
      ehInstrutor: false
    };
  }


  ngOnInit(): void {

    this.todasAsPessoas = this.tripulantes.concat(this.instrutores);

    this.turmaInterna = Object.assign(new Turma, this.turma);
    this.turmaInterna.CargaHoraria = 0;
    if (this.turmaInterna.Deslocamentos)
      this.turmaInterna.Deslocamentos.forEach(x => {
        x.Data = new Date(x.Data);
      });

    this.definirStatusTurma();

    this.api.getUsuarioLogadoComPermissoes(resp => {
      this.usuarioLogado = resp;

      this.periodo = this.turmaInterna.HorasTurma.map(a => new Date(a.Data));
      this.alunos = this.turmaInterna.TurmaAluno.map(a => ({ Id: a.Aluno.Id, Trato: a.Aluno.Trato, CodigoANAC: a.Aluno.CodigoANAC, Cargo: a.Aluno.Cargo.Nome, Licenca: a.Aluno.Licenca, Confirmado: a.Confirmado, Avaliado: a.Avaliado, Notificado: a.Notificado, Nota: a.Nota, Email: a.Aluno.Email }));
      this.tripulantes = this.tripulantes.filter(x => this.alunos.map(y => y.Id).indexOf(x.Id) == -1);

      if (this.turmaInterna.Treinamento) {
        this.turmaInterna.CargaHoraria = DataUtil.horaToMinuto(this.turmaInterna.Treinamento.CargaHoraria);
        this.turmaInterna.Treinamento = { Id: this.turmaInterna.Treinamento.Id, Nome: this.turmaInterna.Treinamento.Nome, CargaHoraria: this.turmaInterna.Treinamento.CargaHoraria };
      }

      if (this.turmaInterna.Instrutor) {
        this.turmaInterna.Instrutor = { Id: this.turmaInterna.Instrutor.Id, Trato: this.turmaInterna.Instrutor.Trato };
      }

      this.periodo = this.turmaInterna.Datas.map(a => new Date(a.Data));
      this.alunos = this.turmaInterna.TurmaAluno
        .map(a => ({ Id: a.Aluno.Id, Trato: a.Aluno.Trato, CodigoANAC: a.Aluno.CodigoANAC, Cargo: a.Aluno.Cargo.Nome, Licenca: a.Aluno.Licenca, Confirmado: a.Confirmado, Avaliado: a.Avaliado, Notificado: a.Notificado, Nota: a.Nota }));
      this.tripulantes = this.tripulantes.filter(x => this.alunos.map(y => y['Id']).indexOf(x['Id']) == -1);


    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.atualizarPassos(() => { }); }, 0);
    this.cdr.detectChanges();
  }

}
