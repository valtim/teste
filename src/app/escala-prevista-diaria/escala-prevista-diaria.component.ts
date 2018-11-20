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
    this.escala = {
      Coordenador: '',
      Comentario: '',
      ListaDeEmails: '',
      Escalas: []
    };
    this.clientes = [];
  }

  ngOnInit() {
    this.app.setTitle('Escala de Trabalho');
    this.dataEscalaTrabalho = new Date().toISOString().split('T')[0];
    this.loading = true;
    this.prefixos = this.api.getPrefixos();
    this.clientes = this.api.getClientes();
    this.tripulantes = this.api.getTripulantes();
    this.api.getBase().then(response => {
      this.bases = response;
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
          message: '',
          type: 'error',
          callBack: () => {
            console.log('Copiar a ultima escala');
          }
        };
        console.log('Error: ', error);
        this.loading = false;
      });
  }

  private montarEscala(responseEscala) {
    this.escala = responseEscala;
    this.escala.Escalas.forEach(escala => {
      escala.Escalas.forEach(trip => {
        if (!trip.Tripulante) {
          trip.Tripulante = { Id: '' };
        }
      });

      escala.HoraDaApresentacao = escala.HoraDaApresentacao.split('T')[1];
      escala.LimiteDeRefeicao = escala.LimiteDeRefeicao.split('T')[1];

      if (!escala.Cliente) {
        escala.Cliente = { Id: '' };
      }
    });
  }

  onChangeApresentacao(escala) {
    const [h, m, s] = escala.HoraDaApresentacao.split(':');
    let hora: string | number = Number(h) + 6;
    hora = hora < 10 ? '0' + hora : hora;
    escala.LimiteDeRefeicao = hora + ':' + m + ':' + s;
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
      Prefixo: { Id: '', PrefixoCompleto: '', TipoDeAeronave: {} },
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
    return this.escala.Escalas.filter(trabalho => trabalho.Ativo);
  }
}
