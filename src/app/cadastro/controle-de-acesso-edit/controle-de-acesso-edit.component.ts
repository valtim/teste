import { Perfis } from "./../../models/Perfis";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { PermissoesDeAcessoById } from "src/app/models/PermissaoDeAcessoById";
import { ApiService } from "src/app/shared/api.service";

@Component({
  selector: "app-controle-de-acesso-edit",
  templateUrl: "./controle-de-acesso-edit.component.html",
  styleUrls: ["./controle-de-acesso-edit.component.css"],
})
export class ControleDeAcessoEditComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}

  permissoesById: any[];
  perfis: any[];
  nomeDosPerfis: any[];
  perfisHabilitados: any[];
  nomePerfisHabilitados;
  id_busca;
  nome;
  senha;
  email;

  ngOnInit(): void {
    let lista = this.router.url.split("/");
    this.id_busca = lista[lista.length - 1];
    this.api.getPermissaoById(this.id_busca).then((resp) => {
      this.permissoesById = resp;
      this.perfisHabilitados = resp.PerfisHabilitados;
      this.nome = resp.Username;
      this.email = resp.Email;
      this.senha = resp.Senha;
      this.getAllPerfis();

      this.getPerfisHabilitados();
    });
  }

  isTripulante() {
    if (
      this.perfisHabilitados
        .map((x) => x.Sigla)
        .filter((y) => ["trp"].includes(y)).length > 0
    )
      return true;
    else return false;
  }

  getAllPerfis() {
    this.api.getPerfis().then((response) => {
      this.perfis = response;
      this.nomeDosPerfis = response.Nome;
    });
  }

  getPerfisHabilitados() {
    this.nomePerfisHabilitados = this.perfisHabilitados.map((trp) => trp.Nome);
    return this.nomePerfisHabilitados;
  }
}
