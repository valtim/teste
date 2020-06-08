import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
  providers: [MessageService]
})
export class ContratoComponent implements OnInit {
  botoes: MenuItem[];
  data: Date;
  locale_pt: any;
  prefixos: { value: { value: string; label: string; }; label: string; }[];
  clientes: any;

  constructor(
    private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.botoes =
      [
        {
          label: 'Novo',
          icon: 'pi pi-plus',
          command: () => { this.novoItem(); }
        },
        {
          label: 'Salvar',
          icon: 'pi pi-save',
          command: () => { this.salvar() },
          disabled: false,
        },
        {
          label: 'Excluir',
          icon: 'pi pi-trash',
          command: () => { this.excluir() },
          disabled: true,
        },
      ];



    var date = new Date();
    date.setDate(date.getDate() + 1);
    
    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');

    let nova = [{ value: { value : this.api.newBlankGuid(), label: ''}, label: '' }];

    this.api.getCombos().then(x => {

      let nova = [{ value: undefined, label: '' }];
      

    });

    this.api.getCombos().then(x => {

      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      this.rodarRelatorio();

    });
  }
  rodarRelatorio() {
    
  }
  excluir() {
    throw new Error("Method not implemented.");
  }
  salvar() {
    throw new Error("Method not implemented.");
  }
  novoItem() {
    throw new Error("Method not implemented.");
  }

}
