import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { ApiService } from "../../shared/api.service";
import { Component, Input, OnInit } from "@angular/core";
import { FichasDeAvaliacao } from "src/app/models/FichasDeAvaliacao";

@Component({
  selector: "app-ficha-de-avaliacao-edit",
  templateUrl: "./ficha-de-avaliacao-edit.component.html",
  styleUrls: ["./ficha-de-avaliacao-edit.component.css"],
  providers: [MessageService],
})
export class FichaDeAvaliacaoEditComponent implements OnInit {
  fichas;
  nome;

  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  @Input() fichaDeAvaliacao: FichasDeAvaliacao;

  ngOnInit(): void {
    this.api.getFichaDeAvaliacao().then((resp) => {
      this.fichas = resp;
    });
  }

  salvar(ficha) {
    let fichaDeAvaliacao = new FichasDeAvaliacao();
    fichaDeAvaliacao.Nome = ficha;

    this.api.postFichaDeAvaliacao(fichaDeAvaliacao).then(() => {
      alert("Ficha criada com sucesso!");

      this.router.navigate(["/ficha-de-avaliacao"]);
    });
  }
}
