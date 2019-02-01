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
  private searchNumero = '';
  private folhaMask = [/\d/, /\d/, /\d/, /\d/];
  private numeroMask = [/\d/, /\d/, /\d/, '/', /[A-Z]/, /[A-Z]/, /[A-Z]/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private app: AppComponent, private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Bloco');
    this.prefixos = this.api.getPrefixos();
    this.api.getListaBloco().then(result => {
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

    const existBloco = this.saveBlocoList.filter((saveBloco) => {
      return saveBloco.Id === bloco.Id;
    })[0];

    if (existBloco) {
      this.saveBlocoList.splice(existBloco, 1);
    }
    this.saveBlocoList.push(bloco);
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
            title: 'Errr',
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
