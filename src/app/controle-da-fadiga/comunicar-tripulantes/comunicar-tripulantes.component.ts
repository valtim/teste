import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comunicar-tripulantes',
  templateUrl: './comunicar-tripulantes.component.html',
  styleUrls: ['./comunicar-tripulantes.component.css']
})
export class ComunicarTripulantesComponent implements OnInit {

  data;

  texto = "";

  tripulantes: any;

  exibirMensagem = false;
  mensagem;
  loading = true;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.paramMap.get('data');

    this.api.getPendenciaDeFadiga(this.data).then((x) => {
      this.tripulantes = x.Tripulantes;
      this.texto = x.Mensagem;
      this.loading = false;
    });
  }

  EnviarMensagem() {
    this.loading = true;
    let email = {
      HTML: this.texto,
      Subject: "Não esqueça da Pesquisa de Fadiga",
      To: this.tripulantes
        .filter(opt => opt.Marcado)
        .map(opt => opt.Trato + "/" + opt.Email).join(",")
    };
    this.api.postPendenciaDeFadiga(email).then((response) => {
      this.mensagem = "Mensagem enviada para os tripulantes selecionados!"
      this.exibirMensagem = true;
      this.loading = false;
    }).catch((error) => {
      // if (error.status === 403) {
      this.mensagem = "Erro ao enviar mensagem."
      this.exibirMensagem = true;
      this.loading = false;
    });
  }

}
