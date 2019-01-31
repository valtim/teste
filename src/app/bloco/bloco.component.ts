import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bloco',
  templateUrl: './bloco.component.html',
  styleUrls: ['./bloco.component.css']
})
export class BlocoComponent implements OnInit {

  private blocos = [];
  private loading = true;
  private prefixos = [];
  private saveBlocoList = [];

  constructor(private app: AppComponent, private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Bloco');
    this.prefixos = this.api.getPrefixos();
    this.api.getListaBloco().then(result => {
      this.blocos = result;
      this.loading = false;
    });
  }

  onClickAddBloco() {
    const newBloco = {
      Ativo: true,
      Prefixo: {},
      Numero: '',
      FolhaInicial: '',
      FolhaFinal: '',
      Fechado: false,
      Deletar: false,
      Atualizacao: new Date()
    };
    this.blocos.unshift(newBloco);
  }

  editBloco(bloco: any) {
    bloco.Ativo = !bloco.Deletar;

    bloco.Prefixo = this.prefixos.filter((prefixo) => {
      return prefixo.Id === bloco.Prefixo.Id;
    })[0];

    const existBloco = this.saveBlocoList.filter((saveBloco) => {
      return saveBloco.Id === bloco.Id;
    })[0];

    if (existBloco) {
      this.saveBlocoList.splice(existBloco, 1);
    }
    this.saveBlocoList.push(bloco);
  }

  saveBloco() {
    console.log(this.saveBlocoList);
  }

  onSaveClick() {
    console.log('submit');
  }

  // filtroNumero(index: number) {
  //   const value = this.blocos[index].Numero as string;
  //   if (value.length > 2) {
  //     let regex = /\d{3}/;
  //     let result = regex.exec(value)[0];
  //     console.log('result 1', result);
  //     result += '/';
  //     if (value.length > 6) {
  //       regex = /\d{3}\/\w{3}/;
  //       result += regex.exec(value)[0];
  //       console.log('result 2', result);
  //       result += '/';
  //       if (value.length > 11) {
  //         regex = /\d{3}\/\w{3}\/\d{4}/;
  //         result += regex.exec(value)[0];
  //         console.log('result 3', result);
  //       }
  //     }
  //     this.blocos[index].Numero = result;
  //   }
  // }

}
