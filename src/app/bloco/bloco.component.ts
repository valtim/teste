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
  private numeroMask = [/\d/, /\d/, /\d/, '/', /[A-Z]/, /[A-Z]/, /[A-Z]/, '/', /\d/, /\d/, /\d/, /\d/];
  private folhaMask = [/\d/, /\d/, /\d/, /\d/];

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

}
