import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  private arquivos: FileList;
  private descricao: string;

  constructor(private app: AppComponent, private api: ApiService) {
    this.app.setTitle('Certificado');
  }

  ngOnInit() {
  }

  selectedFile(event: HTMLInputEvent) {
    this.arquivos = event.target.files;
  }

  onSaveClick() {
    if (this.descricao && this.arquivos) {
      this.api.postUploadEscel(this.descricao, this.arquivos);
    }
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
