import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-status-tripulante',
  templateUrl: './status-tripulante.component.html',
  styleUrls: ['./status-tripulante.component.css']
})
export class StatusTripulanteComponent implements OnInit {

  constructor(private http: HttpClient) { }
  private data: Date;
  private tripulantes = [{
    Pessoa: {
      Nome: 'Teste 1'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 2'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 1'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 2'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 2'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 1'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 2'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 2'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 1'
    }
  },
  {
    Pessoa: {
      Nome: 'Teste 2'
    }
  }];

  ngOnInit() {
  }

  onBuscarTripulante() {
    this.http.get('/api/pesquisa/pordata/' + this.data).subscribe((response: Response) => {
      this.tripulantes = response;
    });
  }

}
