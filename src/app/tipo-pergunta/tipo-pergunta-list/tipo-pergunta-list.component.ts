import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tipo-pergunta-list',
  templateUrl: './tipo-pergunta-list.component.html',
  styleUrls: ['./tipo-pergunta-list.component.css']
})
export class TipoPerguntaListComponent implements OnInit {

  public perguntas = [];
  public loading = false;

  constructor(private app: AppComponent, private api: ApiService) {
    this.app.setTitle('Perguntas');
  }

  ngOnInit() {
    this.loading = true;
    this.api.getTipoPergunta().then((response: any) => {
      this.perguntas = response;
      this.loading = false;
    });
  }

}
