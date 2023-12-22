import { Component, OnInit, Input } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css'],
  providers: [MessageService]
})
export class AnexosComponent implements OnInit {
  @Input() turma: string;
  @Input() tipoDeAnexo: string;
  @Input() prefix: string;
  @Input() ignorePrefix: string;


  @Input() listaReadOnly = [];
  @Input() listaArquivos = [];
  @Input() callbackFunction: (args: any) => void;
  anexos = [];

  uploadAnexos(event) {   

    const formData = new FormData();

    event.files.forEach((arq, index) => {
      let nameFile = arq.name.replace(/ /g, '_');
      if (this.prefix) {
        nameFile = this.prefix + nameFile;
      }
      formData.append(`file[${index}]`, arq, nameFile);
    });

    this.api.postReferenciaTipo(this.turma, this.tipoDeAnexo, formData).then((a) => {

      // this.listaArquivos = [];

      // a.forEach((arq, index) => {
        this.listaArquivos.push(a);
      // });

      let message = '1 arquivo carregado com sucesso!';
      if ( a.length > 1)
        message = a.length+ ' arquivos carregado com sucesso!'

      this.messageService.add({severity:'success', summary:'Upload de Arquivos', detail:message});
      this.callbackFunction(this.listaArquivos);
  return;
    });
  }

  funDeletar(id : string){
    this.api.deleteAnexo(id).then(() => { 

      let deletado = this.listaArquivos.find(x=>x.Id != id);
      this.listaArquivos = this.listaArquivos.filter(x=>x.Id != id);

      this.messageService.add({severity:'warn', summary:'Exclusão de Arquivos', detail:`Arquivo ${deletado.FileName} excluído com sucesso`});
      //alert('Arquivo Excluído com sucesso');
    })
  }


  funAbrirArquivo(id : string){
    window.open(this.api.url + 'arquivo/'+id,'_blank');
  }
  constructor(private api: ApiTurmasService, private messageService: MessageService ) { }

  ngOnInit() {


    // if (this.turma) {
    //   this.getListOfFile();
    // }
  }

}
