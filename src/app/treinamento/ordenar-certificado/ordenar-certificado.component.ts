import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-ordenar-certificado',
  templateUrl: './ordenar-certificado.component.html',
  styleUrls: ['./ordenar-certificado.component.css']
})
export class OrdenarCertificadoComponent implements OnInit {
  treinamentos: any;
  loading: boolean;


  cols = [
    { field: 'Nome', header: 'Nome' },
  ];



  salvar() {
    let i = 0;
    this.treinamentos.forEach(x => x.Ordem = ++i);

    this.api.postCertificado(this.treinamentos).then(() => {
      alert('Salvo com Sucesso!');
    })

  }

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.api.getCertificado()
      .then(x => {
        this.treinamentos = x;
        this.loading = false;
      });
  }






}
