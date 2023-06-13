import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-apontamento',
  templateUrl: './apontamento.component.html',
  styleUrls: ['./apontamento.component.css'],
  providers: [MessageService]
})
export class ApontamentoComponent implements OnInit {

  tudoPronto: boolean;
  dataSelecionada: Date;
  apontamentos: any[];
  codigos: any[];

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    var date = new Date();
    this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.rodarRelatorio();
  }

  rodarRelatorio(){
    this.tudoPronto = false;

    this.api.getApontamentos(this.dataSelecionada.getMonth(),this.dataSelecionada.getFullYear()).then(x => {
      this.codigos = x.Codigos;      
      this.apontamentos = x.Apontamentos;      
      this.tudoPronto = true;
    });        
  }

  alterarCodigo(apontamento) {
    this.tudoPronto = false;
    this.api.postApontamento(apontamento).then(x => {            
      this.tudoPronto = true;      
    }).catch((x) => {
      console.error(x);
      this.messageService.add({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao atualizar o Código do Apontamento!",
      });
    });
  }

}

/*
  Valter, se você precisar, estou enviando as DDL das tabelas (se vc for criá-las manualmente)

  CREATE TABLE `ap_codigo` (
    `Id` varchar(40) NOT NULL,
    `Ativo` tinyint(1) DEFAULT NULL,
    `Atualizacao` datetime DEFAULT NULL,  
    `DescricaoOperacao` varchar(400) DEFAULT NULL,
    `GrupoCodigos` varchar(100) DEFAULT NULL,
    `CodigoOperacao` varchar(100) DEFAULT NULL,
    `Tabela` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`Id`)  
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

  CREATE TABLE `ap_apontamento` (
    `Id` varchar(40) NOT NULL,
    `Ativo` tinyint(1) DEFAULT NULL,
    `Atualizacao` datetime DEFAULT NULL,
    `Equipamento` varchar(100) DEFAULT NULL,
    `Atendimento` varchar(100) DEFAULT NULL,
    `Escala` varchar(100) DEFAULT NULL,
    `Codigo_id` varchar(40) DEFAULT NULL,
    `DataInicial` datetime DEFAULT NULL,
    `HoraInicial` datetime DEFAULT NULL,
    `HoraFinal` datetime DEFAULT NULL,
    `HorasVoadas` datetime DEFAULT NULL,
    `HorasGlosadas` datetime DEFAULT NULL,
    `QuantidadeItemAvulso` varchar(100) DEFAULT NULL,
    `Observacoes` varchar(400) DEFAULT NULL,
    PRIMARY KEY (`Id`),
    KEY `Codigo_id` (`Codigo_id`),
    CONSTRAINT `FK_Codigo` FOREIGN KEY (`Codigo_id`) REFERENCES `ap_codigo` (`Id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
*/
