import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PesquisaService } from '../pesquisa.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-intensidade-sono',
  templateUrl: './intensidade-sono.component.html',
  styleUrls: ['./intensidade-sono.component.css']
})
export class IntensidadeSonoComponent implements OnInit, OnDestroy {

  user
  oportunidadeSono
  qualidadeSono
  pesquisaData

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': '24bdd443-0570-40cc-bcde-b3edc401f49f'
    })
  }

  constructor(private route: Router, private pesquisa: PesquisaService, private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    if (this.data.user === undefined || this.pesquisa.oportunidadeSono === undefined || this.pesquisa.qualidadeSono === undefined) {
      this.route.navigate(['/']);
    } else {
      this.user = this.data.user;
      this.oportunidadeSono = this.pesquisa.oportunidadeSono;
      this.qualidadeSono = this.pesquisa.qualidadeSono;
    }
  }

  questoes = [
    { condicao: 'Assistindo TV', name: 'assistindoTV' },
    { condicao: 'Sentado e lendo', name: 'lendo' },
    { condicao: 'Sentado em um lugar público', name: 'sentadoPublico' },
    { condicao: 'Sentado conversando com alguém', name: 'sentadoConsersando' },
    { condicao: 'Sentado calmamente após o almoço', name: 'sentadoAlmoco' },
    { condicao: 'Como passageiro, andando uma hora sem parar', name: 'passageiro' },
    { condicao: 'Enquanto para por alguns minutos ao pegar trânsito intenso', name: 'transitoIntenso' },
    { condicao: 'Deitado, descansado à tarde, quando as circunstâncias permitem', name: 'deitadoDescansado' }
  ]

  onTerminar() {
    let terminar = true;
    this.questoes.forEach((questao) => {
      if (this.pesquisa[questao.name] === undefined) {
        terminar = false;
      }
    });

    if (terminar) {
      let pesquisaData = {};
      Object.keys(this.pesquisa).forEach((key) => {
        pesquisaData[key] = this.pesquisa[key];
      });
      this.pesquisaData = pesquisaData;
      this.pesquisaData.Pessoa = this.data.user;
      console.log(this.pesquisaData);
      this.http.post('https://www.controledafadiga.com.br/api/pesquisa', this.pesquisaData, this.httpOptions).subscribe(data => {
        console.log('Data :', data);
      }, (error) => {
        console.log('ERROR :', error);
      });
      // this.route.navigate(['/resultado']);
    }
  }

  ngOnDestroy() {
    this.data.user = this.user;
    this.pesquisa.oportunidadeSono = this.oportunidadeSono;
    this.pesquisa.qualidadeSono = this.qualidadeSono;
  }
}
