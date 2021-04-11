import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../shared/api.service';

@Component({
  selector: 'app-imprimir-jornada-novo',
  templateUrl: './imprimir-jornada-novo.component.html',
  styleUrls: ['./imprimir-jornada-novo.component.css']
})
export class ImprimirJornadaNovoComponent implements AfterViewInit {
  mes: number;
  ano: number;
  anac: string;

  public myAngularxQrCode: string = null;
  retorno: any;
  id: string;


  confirmacaoDoTripulante;
  confirmacaoDoGerente;

  carregando = true;


  @Input() jornada: any = { Id : null };

  @Input() gerente: boolean;

  @Input() analista: boolean;

  @Input() tripulante: any;

  constructor(private api: ApiService,
    private route: ActivatedRoute) { }


  ngAfterViewInit(): void {
         this.carregando = false;


    // this.id = this.route.snapshot.paramMap.get("id");

    // if (this.id == null)
    //   this.id = this.jornada.Id;

    // if (this.id != null) {
    //   this.api.getJornadaImpressaoPeloId(this.id).then(
    //     x => {

    //       this.retorno = x;
    //       this.carregando = false;

    //       if (x.Jornada.ConfirmacaoDoTripulante != null)
    //         this.confirmacaoDoTripulante = x.Jornada.ConfirmacaoDoTripulante;

    //       if (x.Jornada.ConfirmacaoDoGerente != null)
    //         this.confirmacaoDoGerente = x.Jornada.ConfirmacaoDoGerente;

    //       this.myAngularxQrCode = this.retorno.Caminho;
    //     }
    //   )
    //   return;
    // }

  }

  confirmarJornada(ehGerente:boolean, id){
    this.api.getConfirmacaoDeJornada(ehGerente, id).then(x=>{
      if ( ehGerente )
        this.jornada.ConfirmacaoDoGerente = x;
      else
        this.jornada.ConfirmacaoDoAssistente = x;
      this.jornada.Visible = false;
    });
  }

}
