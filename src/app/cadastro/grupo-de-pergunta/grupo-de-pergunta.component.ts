import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { ApiService } from "src/app/shared/api.service";
import { Component, Input, OnInit } from "@angular/core";
import { GruposDePerguntas } from "src/app/models/GruposDePerguntas";

@Component({
  selector: "app-grupo-de-pergunta",
  templateUrl: "./grupo-de-pergunta.component.html",
  styleUrls: ["./grupo-de-pergunta.component.css"],
  providers: [MessageService],
})
export class GrupoDePerguntaComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  @Input() grupoDePergunta: GruposDePerguntas;

  grupos;
  nome;
  log: any[] = [];

  ngOnInit(): void {
    this.api.getGrupoDeFicha().then((resp) => {
      this.grupos = resp;
    });
  }

  salvar(nome) {
    let grupoPergunta = new GruposDePerguntas();
    grupoPergunta.Nome = nome;

    this.api.postGrupoDeFicha(grupoPergunta).then(() => {
      alert("Grupo criado com sucesso!");

      this.ngOnInit();
    });
  }

  excluir(grupo) {
    grupo.Ativo = false;
    grupo.Atualizacao = Date.now;
    this.api
      .postGrupoDeFicha(grupo)
      .then(() => {
        alert("Grupo desativado com sucesso");
      })
      .catch((x) => {
        console.log(x);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: `Erro ao desativar grupo`,
        });
      });
    this.grupos = this.grupos.filter((x) => x.Id != grupo.Id);
  }

  onRowReorder(event) {
    this.log.push(event);
  }
}
