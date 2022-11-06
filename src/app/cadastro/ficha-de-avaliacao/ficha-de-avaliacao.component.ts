import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { ApiService } from "./../../shared/api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ficha-de-avaliacao",
  templateUrl: "./ficha-de-avaliacao.component.html",
  styleUrls: ["./ficha-de-avaliacao.component.css"],
  providers: [MessageService],
})
export class FichaDeAvaliacaoComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  fichas;
  displayModal = false;

  ngOnInit(): void {
    this.api.getFichaDeAvaliacao().then((resp) => {
      this.fichas = resp;
    });
  }

  novaFicha() {
    this.router.navigate(["/ficha-de-avaliacao/novo"]);
  }

  excluir(ficha) {
    ficha.Ativo = false;
    this.api
      .postFichaDeAvaliacao(ficha)
      .then(() => {
        alert("Ficha desativada com sucesso");
      })
      .catch((x) => {
        console.log(x);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: `Erro ao desativar ficha.`,
        });
      });
    this.fichas = this.fichas.filter((x) => x.Id != ficha.Id);
  }

  editar(Id) {
    this.router.navigate(["/ficha-de-avaliacao-item/" + Id]);
  }
}
