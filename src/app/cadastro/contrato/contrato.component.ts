import { PermissoesDeAcessoById } from "./../../models/PermissaoDeAcessoById";
import { PermissoesDeAcesso } from "./../../models/PermissoesDeAcesso";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, MenuItem } from "primeng/api";
import { element } from "protractor";
import { ApiService } from "src/app/shared/api.service";

@Component({
  selector: "app-contrato",
  templateUrl: "./contrato.component.html",
  styleUrls: ["./contrato.component.css"],
  providers: [MessageService],
})
export class ContratoComponent implements OnInit {
  permissoes: Array<PermissoesDeAcesso> = [];

  selectedContrato;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.exibirRelatorio();
  }

  exibirRelatorio() {
    this.api.getPermissao().then((resp) => {
      this.permissoes = resp;
    });
  }

  onRowSelect(event) {
    this.router.navigate(["/controle-de-acesso/" + event.data.Id]);
  }
  novoCadastro() {
    this.router.navigate(["/controle-de-acesso/novo"]);
  }
}
