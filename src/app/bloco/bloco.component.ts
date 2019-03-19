import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bloco',
  templateUrl: './bloco.component.html',
  styleUrls: ['./bloco.component.css']
})
export class BlocoComponent implements OnInit {

  public blocos = [];
  public loading = true;
  public prefixos = [];
  public saveBlocoList = [];
  public prefixoSearch = '';
  public folhaMask = [/\d/, /\d/, /\d/, /\d/];
  public numeroMask = [/\d/, /\d/, /\d/, '/', /[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private app: AppComponent, private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Bloco');
    this.prefixos = this.api.getPrefixos();
    this.api.getListaBloco().then(result => {
      this.blocos = result.filter(r => r.Ativo);
      this.loading = false;
    });
  }

  onSearchByPrefixo() {
    this.loading = true;
    this.api.getListaBlocoByPrefixo(this.prefixoSearch).then(result => {
      this.blocos = result.filter(r => r.Ativo);
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

    bloco.Numero = bloco.Numero.toUpperCase();

    const existBloco = this.saveBlocoList.filter((saveBloco) => {
      return saveBloco.Id === bloco.Id;
    })[0];

    if (existBloco) {
      this.saveBlocoList.splice(existBloco, 1);
    }

    if (bloco.Numero && bloco.Prefixo && bloco.FolhaInicial && bloco.FolhaFinal) {
      this.saveBlocoList.push(bloco);
    }
  }

  onSaveClick() {
    if (this.saveBlocoList.length) {
      const callBack = () => {
        this.api.postBlocoList(this.saveBlocoList).then(result => {
          this.saveBlocoList = [];
          this.api.message = {
            show: true,
            type: 'success',
            title: '',
            message: 'Alteração realizadas com sucesso.'
          };
        }).catch((erro) => {
          this.api.message = {
            show: true,
            type: 'error',
            title: 'Erro',
            message: erro
          };
        });
      };

      this.api.message = {
        show: true,
        type: 'alert',
        title: 'Tem certeza?',
        message: 'Você deseja salvar as alterações?',
        callBack: callBack
      };
    }
  }

}
