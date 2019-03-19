import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-escala-prevista-diaria',
  templateUrl: './escala-prevista-diaria.component.html',
  styleUrls: ['./escala-prevista-diaria.component.css']
})
export class EscalaPrevistaDiariaComponent implements OnInit {

  loading: boolean;
  dataEscalaTrabalho: string;
  escala: any;
  clientes: any;
  tripulantes: any;
  bases: any;
  prefixos: any;

  constructor(private app: AppComponent, private api: ApiService) {
    this.clientes = [];
  }

  ngOnInit() {
    this.app.setTitle('Escala de Trabalho');
    this.escala = {
      Escalas: []
    };
    this.dataEscalaTrabalho = new Date().toISOString().split('T')[0];
    this.loading = true;
    this.api.getListaEscalaPrevista().then((response) => {
      this.prefixos = response.Prefixo;
      this.clientes = response.Cliente;
      this.tripulantes = response.Tripulante;
      this.bases = response.Base;
      this.loading = false;
    }).catch((error) => {
      this.api.message = {
        show: true,
        type: 'error',
        title: error.error.Message,
        message: error.error.ExceptionMessage
      };
      this.loading = false;
    });
    this.onChangeDate();
  }

  onChangeDate() {
    this.loading = true;
    this.api.getEscala(this.dataEscalaTrabalho)
      .then((response: Response) => {
        if (response) {
          this.montarEscala(response);
        } else {
          this.api.message = {
            show: true,
            title: 'Não encontramos a escala do dia ' + new Date(this.dataEscalaTrabalho + 'T00:00:00').toLocaleDateString(),
            message: 'Você gostaria de copiar a ultima escala?',
            type: 'alert',
            callBack: () => {
              this.loading = true;
              this.api.getUltimaEscala().then((resp) => {
                resp.Data = this.dataEscalaTrabalho + 'T00:00:00';
                resp.Id = null;
                this.montarEscala(resp);
                this.loading = false;
              });
            }
          };
        }
        this.loading = false;
      }).catch(error => {
        this.api.message = {
          show: true,
          title: error.error.Message,
          message: error.error.ExceptionMessage,
          type: 'error'
        };
        console.log('Error: ', error);
        this.loading = false;
      });
  }

  compareMatricula(matricula1: any, matricula2: any): boolean {
    return matricula1 && matricula2 ? matricula1.Id === matricula2.Id : matricula1 === matricula2;
  }

  private montarEscala(responseEscala: any) {
    this.escala = responseEscala;
    console.log(this.escala);
    console.log(this.escala.Escalas);
    this.escala.Escalas.forEach((escala: any) => {
      escala.Escalas.forEach((trip: any) => {
        if (!trip.Tripulante) {
          trip.Tripulante = { Id: '', Trato: '' };
        }
      });

      escala.HoraDaApresentacao = escala.HoraDaApresentacao.split('T')[1];
      escala.LimiteDeRefeicao = escala.LimiteDeRefeicao.split('T')[1];

      if (!escala.Cliente) {
        escala.Cliente = { Id: '' };
      }
    });
  }

  salvarEscala() {
    const baseSelected = !!this.escala.Escalas.filter(trabalho => trabalho.Localidade.Id === '' || !trabalho.Localidade).length;
    if (baseSelected) {
      this.api.message = {
        show: true,
        type: 'error',
        title: 'O campo Base é obrigatório',
        message: 'Selecione uma base para cada escala de trabalho'
      };
    } else {
      this.api.message = {
        show: true,
        title: 'Salvar alteração.',
        message: 'Você tem certeza que gostaria de salvar as alterações feitas?',
        callBack: () => {
          this.loading = true;
          this.api.postEscala(this.escala).then(response => {
            this.loading = false;
          }).catch((error) => {
            this.api.message = {
              show: true,
              type: 'error',
              title: error.error.Message,
              message: error.error.ExceptionMessage
            };
            this.loading = false;
          });
        }
      };
    }
  }

  onChangeApresentacao(escala) {
    const [h, m, s] = escala.HoraDaApresentacao.split(':');
    let hora: string | number = Number(h) + 6;
    hora = hora < 10 ? '0' + hora : hora;
    escala.LimiteDeRefeicao = hora + ':' + m + ':' + s;
  }

  onChangeTripulante(index: number) {
    let tripulante1 = null;
    let tripulante2 = null;
    const trabalho = this.escalasAtivas()[index];

    tripulante1 = this.tripulantes.filter(trip => {
      return trip.Id === trabalho.Escalas[0].Tripulante.Id;
    })[0];

    tripulante2 = this.tripulantes.filter(trip => {
      return trip.Id === trabalho.Escalas[1].Tripulante.Id;
    })[0];

    if (tripulante1 && tripulante2) {
      if (this.idade(tripulante1.Nascimento) + this.idade(tripulante2.Nascimento) >= 120) {
        this.api.message = {
          show: true,
          type: 'alert',
          title: 'Atenção com os tripulantes',
          message: 'Idades dos tripulantes maior que 120 anos.'
        };
      }
      if (this.idade(tripulante1.Nascimento) >= 65) {
        this.api.message = {
          show: true,
          type: 'alert',
          title: 'Atenção com os tripulantes',
          message: `Idades do tripulante ${tripulante1.Trato} supera 65 anos.`
        };
      }
      if (this.idade(tripulante2.Nascimento) >= 65) {
        this.api.message = {
          show: true,
          type: 'alert',
          title: 'Atenção com os tripulantes',
          message: `Idades do tripulante ${tripulante2.Trato} supera 65 anos.`
        };
      }
    }
  }

  newEscala() {
    const novaEscala = {
      novo: true,
      Ativo: true,
      Cliente: { Id: '' },
      Data: new Date(),
      Disponibilidade: false,
      Escalas: [
        {
          NumeroDoTripulante: 1,
          Tripulante: { Id: '' }
        },
        {
          NumeroDoTripulante: 2,
          Tripulante: { Id: '' }
        }
      ],
      HoraDaApresentacao: '00:00:00',
      Id: '',
      LimiteDeRefeicao: '',
      Localidade: { Id: '' },
      Observacao: '',
      Prefixo: { Id: '', PrefixoCompleto: '', TipoDeAeronave: { NumeroDeTripulantes: 2 } },
      SemApresentacao: true,
    };
    this.escala.Escalas.push(novaEscala);
  }

  deleteEscala(escala) {
    this.api.message.show = true;
    this.api.message.message = `Você tem certeza que gostaria de excluir a escala ${escala.Prefixo.PrefixoCompleto} ?`;
    this.api.message.callBack = () => {
      escala.Ativo = false;
    };
  }

  escalasAtivas() {
    return this.escala.Escalas.filter(trabalho => trabalho.Ativo).map((trabalho) => {
      if (!trabalho.Prefixo) {
        trabalho.Prefixo = { Id: '', TipoDeAeronave: { Id: '', NumeroDeTripulantes: 2 } };
      }

      if (!trabalho.Escalas[0]) {
        trabalho.Escalas[0] = {
          Tripulante: { Id: '' }
        };
      }

      if (!trabalho.Escalas[1]) {
        trabalho.Escalas[1] = {
          Tripulante: { Id: '' }
        };
      }
      return trabalho;
    });
  }

  enviarEmail() {
    this.api.message.show = true;
    this.api.message.title = 'Enviar email';
    this.api.message.message = 'Você tem certeza que gostaria de enviar um email para a lista de distribuição?';
    this.api.message.callBack = () => {
      this.api.getEnviarEscalaEmail(this.dataEscalaTrabalho).then(response => {
        this.api.message.show = true;
        this.api.message.type = 'success';
        this.api.message.title = 'Email enviado com sucesso.';
      }).catch(error => {
        this.api.message.show = true;
        this.api.message.type = 'error';
        this.api.message.title = error.error.Message;
        this.api.message.message = error.error.ExceptionMessage;
      });
    };
  }

  idade(dataNascimento: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let anos = hoje.getFullYear() - nascimento.getFullYear();
    if (hoje.getMonth() > nascimento.getMonth()) {
      anos++;
    } else if (hoje.getMonth() === nascimento.getMonth()) {
      if (hoje.getDay() >= nascimento.getDay()) {
        anos++;
      }
    }
    return anos;
  }

  changePosition(index: number, cimaBaixo: boolean) {
    if (cimaBaixo) {
      this.arrayMove(this.escala.Escalas, index, index - 1);
    } else {
      this.arrayMove(this.escala.Escalas, index, index + 1);
    }
  }

  arrayMove(arr: Array<any>, old_index: number, new_index: number) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
}
