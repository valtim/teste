import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-relatorio-voo-bloqueado',
  templateUrl: './relatorio-voo-bloqueado.component.html',
  styleUrls: ['./relatorio-voo-bloqueado.component.css']
})
export class RelatorioVooBloqueadoComponent implements OnInit {


  private id: string;
  private retorno: any;

  private prefixos;
  private tripulantes;
  public diario;
  clientes: any;


private getPrefixo(id:string): string{
  return this.prefixos.filter(x=>x.Id == id)[0].PrefixoCompleto;
}

  constructor(private activatedRoute: ActivatedRoute
    , private api: ApiService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getRDVById(this.id).then(x=> {
      //this.retorno = x;

      this.diario = x;
      // this.tripulantes = x.Tripulante;
      // this.clientes = x.Cliente;
      // this.prefixos = x.Prefixo;

    });

    // if (window.innerWidth < 500 ) { // 768px portrait
    //   this.mobile = true;
    // }


  }

}
