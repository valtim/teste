import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';
import { DataUtil } from 'src/app/shared/DataUtil';

@Component({
  selector: 'app-treinamento-list',
  templateUrl: './treinamento-list.component.html',
  styleUrls: ['./treinamento-list.component.css']
})
export class TreinamentoListComponent implements OnInit {
  listaDeTiposDeTreinamento: any;
  listaDeEquipamentos: any;
  listaDeInstrutores: any;
  loading = true;

  editando = false;

  constructor(private api: ApiTurmasService) { }

  displayModal: boolean = false;

  valoresSelecionados: string[] = [];
  treinamentoEditado: any;

  treinamentos = [];
  cols = [
    { field: 'Nome', header: 'Nome' },
    { field: 'CargaHoraria', header: 'Carga Horária' },
    { field: 'Equipamentos', header: 'Equipamentos' },
    { field: 'HorasDeVoo', header: 'Horas de Voo' },
  ];

  editar(id) {
    let treinamento = this.treinamentos.find(x => x.Id == id);
    this.treinamentoEditado = Object.assign({}, treinamento);
    this.editando = true;
  }

  excluir() {
    this.loading = true;
    this.api.deleteTreinamento(this.valoresSelecionados)
    .then(x=> {
      this.treinamentos = this.treinamentos.filter(y=>this.valoresSelecionados.indexOf(y.Id)!=0);
      this.loading = false;
    })
  }

  salvar(retorno: any) {
    if (!retorno.Salvar) {
      this.editando = false;
      this.treinamentoEditado = undefined;
      return;
    }
    this.api.postTreinamento(retorno.Treinamento).then(x => {
      this.treinamentos = this.treinamentos.filter(t => t.Id != x.Id);
      this.treinamentos.push(x);
      this.editando = false;
      this.treinamentos.sort((a, b) => a.Nome.localeCompare(b.Nome));
      alert('Salvo com sucesso!');
    })
  }

  ngOnInit(): void {
    //this.api.onLoading();
    this.loading = true;
    this.api.getTreinamentos()
      .then(resp => {
        this.listaDeTiposDeTreinamento = resp.TiposTreinamento;
        this.listaDeEquipamentos = resp.Equipamentos;
        this.listaDeInstrutores = resp.Instrutores;
        this.treinamentos = resp.Treinamentos
        this.treinamentos.forEach(x => { x.Display = false; })
        this.loading = false;
      });
  }

  novo() {
    this.treinamentoEditado = {}
    this.editando = true;
  }

  showDialogMaximized(dialog: Dialog) {
    dialog.maximize();
  }

}
