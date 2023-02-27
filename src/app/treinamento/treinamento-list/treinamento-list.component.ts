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

  constructor(private api: ApiTurmasService) { }

  displayModal :boolean = false;  

  treinamentos = [];
  cols = [
    { field: 'Nome', header: 'Nome' },
    { field: 'CargaHoraria', header: 'Carga Horária' },
    { field: 'Equipamentos', header: 'Equipamentos' },
    { field: 'HorasDeVoo', header: 'Horas de Voo' },
  ];

  editar(id){
    let treinamento = this.treinamentos.find(x=>x.Id == id);
    this.treinamentos.find(x=>x.Id == id).Display = true;
    
    this.displayModal = true;
  }


  ngOnInit(): void {
    //this.api.onLoading();
    this.loading = true;
    this.api.getTreinamentos()
    .then(resp =>       
      {
        this.listaDeTiposDeTreinamento = resp.TiposTreinamento;
        this.listaDeEquipamentos = resp.Equipamentos;
        this.listaDeInstrutores = resp.Instrutores;
        
        this.treinamentos = resp.Treinamentos

        this.treinamentos.forEach(x=> { x.Display = false;})
        //this.api.onLoading();  
        this.loading = false;
      });
  }

  showDialogMaximized(dialog: Dialog) {
    dialog.maximize();
  }

  // remove(id: string) {
  //   this.api.onLoading();
  //   this.api.deleteTreinamento(id).then((resp) => {
  //     this.treinamentos = this.treinamentos.filter((treinamento) => {
  //       return treinamento.id !== id;
  //     });
  //   }).finally(() => {
  //     this.api.onLoading();
  //   });
  // }

}
