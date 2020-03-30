import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-visualizar-analise-de-risco',
  templateUrl: './visualizar-analise-de-risco.component.html',
  styleUrls: ['./visualizar-analise-de-risco.component.css']
})
export class VisualizarAnaliseDeRiscoComponent implements OnInit {


  @Input() grupos;
  
  @Input() analise;

  id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService, ) { }

  ngOnInit() {

    // if (this.activatedRoute.snapshot.paramMap.get('id')) {
    //   this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // }

  }

}
