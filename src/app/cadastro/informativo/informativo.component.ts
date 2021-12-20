import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-informativo',
  templateUrl: './informativo.component.html',
  styleUrls: ['./informativo.component.css']
})
export class InformativoComponent implements OnInit {

  constructor(private api: ApiService) { }

  usuarios = [];

  ngOnInit(): void {
    this.api.getListaDeUsuarios().then(x=> this.usuarios = x);
  }

}
