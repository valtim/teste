import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { ApiService } from "src/app/shared/api.service";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { GruposDePerguntas } from "src/app/models/GruposDePerguntas";
import { FichasDeAvaliacao } from "src/app/models/FichasDeAvaliacao";
import { ItemFicha } from "src/app/models/ItemFicha";

@Component({
  selector: "app-ficha-de-avaliacao-item",
  templateUrl: "./ficha-de-avaliacao-item.component.html",
  styleUrls: ["./ficha-de-avaliacao-item.component.css"],
  providers: [MessageService],
})
export class FichaDeAvaliacaoItemComponent implements OnInit {
  @Input() grupo: GruposDePerguntas;
  @Input() fichaDeAvaliacao: FichasDeAvaliacao;
  @Input() itensDaFicha: ItemFicha;
  @Output() newItemEvent = new EventEmitter<boolean>();
  id;
  ficha;
  fichas;
  titulo;
  fichaUnica;
  grupos;
  grupoSelecionado;
  itens;

  idDoGrupoSelecionado;
  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    let lista = this.router.url.split("/");
    this.id = lista[lista.length - 1];

    this.api.getFichaDeAvaliacao().then((resp) => {
      this.fichas = resp;
      this.fichaUnica = this.fichas.filter((x) => x.Id == this.id);
      this.titulo = this.fichaUnica[0].Nome;
      this.ficha = this.fichaUnica[0];
      this.itens = this.fichaUnica[0].Itens;

      this.getGrupos();
    });
  }

  novaPergunta() {
    let element = document.getElementById("index");
    if (this.ficha.Itens == undefined) this.ficha.Itens = [];
    this.ficha.Itens.push({
      Grupo: { Nome: "" },
      Texto: "",
    });
  }

  getGrupos() {
    this.api.getGrupoDeFicha().then((resp) => {
      this.grupos = resp;
    });
  }

  excluirItem(ficha, linha) {
    linha.Ativo = false;
    this.salvar(ficha);
    this.itens = this.itens.filter((x) => x.Id != linha.Id);
  }

  salvar(ficha) {
    var json = JSON.stringify(ficha);
    this.idDoGrupoSelecionado = this.grupos;
    console.log(json);

    this.api
      .postFichaDeAvaliacao(ficha)
      .then(() => {
        alert("Ficha alterada com sucesso!");
      })
      .catch(() => {
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: `Erro ao Salvar`,
        });
      });
    this.router.navigate(["/ficha-de-avaliacao"]);
  }

  cancelar() {
    this.router.navigate(["/ficha-de-avaliacao"]);
  }
}
