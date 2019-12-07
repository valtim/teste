import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  public arquivos: FileList;
  public descricao: string;

  constructor(private api: ApiService) {
    // this.app.setTitle('Certificado');
  }

  ngOnInit() {
  }

  selectedFile(event: HTMLInputEvent) {
    this.arquivos = event.target.files;
  }

  onSaveClick() {
    if (this.descricao && this.arquivos) {
      this.api.postUploadEscel(this.descricao, this.arquivos).then(result => {
        this.api.message = {
          show: true,
          type: 'success',
          title: 'Certificado',
          message: 'Upload do arquivo realizadas com sucesso.'
        };
      }).catch(error => {
        this.api.message = {
          show: true,
          type: 'error',
          title: 'Certificado',
          message: 'Ocorreu um problema, tente novamente mais tarde. Se o problemas percistir, entre em contato com o suporte tecnico.'
        };
      });
    }
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
