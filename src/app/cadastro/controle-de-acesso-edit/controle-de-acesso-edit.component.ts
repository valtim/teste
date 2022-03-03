import { filter } from "rxjs/operators";
import { PerfisHabilitados } from "./../../models/PerfisHabilitados";
import { Component, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PermissoesDeAcessoById } from "src/app/models/PermissaoDeAcessoById";
import { ApiService } from "src/app/shared/api.service";
import * as EventEmitter from "events";

@Component({
  selector: "app-controle-de-acesso-edit",
  templateUrl: "./controle-de-acesso-edit.component.html",
  styleUrls: ["./controle-de-acesso-edit.component.css"],
  providers: [MessageService],
})
export class ControleDeAcessoEditComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  @Input() permissoes: PermissoesDeAcessoById;

  @Output() retorno = new EventEmitter();

  permissoesById: any[];
  perfis: any[];

  perfisHabilitados: any[];

  nomePerfisHabilitados;
  id_busca;
  nomeDoTripulante;
  acessos;
  resp;
  tripulantes;
  tripulanteSelecionado;

  getUsuario() {
    let lista = this.router.url.split("/");
    this.id_busca = lista[lista.length - 1];
    if (this.id_busca == "novo") {
      this.resp = {};
      return;
    }

    this.api.getPermissaoById(this.id_busca).then((resp) => {
      this.resp = resp;

      this.getPerfisHabilitados();
    });
  }

  ngOnInit(): void {
    this.api.getPerfis().then((response) => {
      this.perfis = response;

      this.api.getTripulantes().then((rsp) => {
        this.tripulantes = rsp;
        this.getUsuario();
      });
    });
  }

  getAllTripulantes() {
    this.api.getTripulantes().then((rsp) => {
      this.tripulantes = rsp;
    });
  }

  getAllPerfis() {
    this.api.getPerfis().then((response) => {
      this.perfis = response;
    });
  }

  getPerfisHabilitados() {
    this.nomePerfisHabilitados = this.resp.PerfisHabilitados.map(
      (trp) => trp.Id
    );
    return this.nomePerfisHabilitados;
  }

  postPerfilDeAcesso() {
    // if (this.resp.Username == null || this.resp.PerfisHabilitados == null) {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Erro",
    //     detail: `Antes de Salvar se atente a preencher os campos obrigatórios.`,
    //   });
    //   return;
    // }

    this.resp.PerfisHabilitados = [];
    this.nomePerfisHabilitados.forEach((x) => {
      this.resp.PerfisHabilitados.push({ Id: x });
    });
    this.tripulanteSelecionado = this.tripulantes;
    this.api
      .postPermissao(this.resp)
      .then(() => {
        alert("Salvo com sucesso");
      })
      .catch((x) => {
        console.log(x);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: `Erro ao Salvar`,
        });
      });
    this.router.navigate(["/controle-de-acesso"]);
  }

  cancelar() {
    // this.retorno.emit(null);
    this.router.navigate(["/controle-de-acesso"]);
  }

  deletar() {
    this.resp.Ativo = false;
    this.resp.Atualizacao = Date.now;
    this.api
      .postPermissao(this.resp)
      .then(() => {
        alert("Perfil desativado com sucesso");
      })
      .catch((x) => {
        console.log(x);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: `Erro ao Desativar perfil`,
        });
      });
    this.router.navigate(["/controle-de-acesso"]);
  }
}
