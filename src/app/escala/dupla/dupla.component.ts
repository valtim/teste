import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GuidUtil } from 'src/app/shared/GuidUtil';
import { EscalaService } from 'src/app/shared/escala.service';

@Component({
  selector: 'app-dupla',
  templateUrl: './dupla.component.html',
  styleUrls: ['./dupla.component.css'],
  providers: [MessageService]
})
export class DuplaComponent implements OnInit {
  locale_pt: any;

  tudoPronto = false;

  linhasSelecionadas = [];

  dataInicio;
  dataFim;
  duplas = [];
  tripulantes: any;
  bases: any;
  prefixos: any;
  resultsTripulante: any;
  resultsBase: any;
  resultsPrefixo: any;
  cursos: any;
  vencimentos: any;
  incompatibilidades: any;

  constructor(private apiEscala: EscalaService,
    private messageService: MessageService) {
    //this.locale_pt = this.api.getLocale('pt');
    this.dataInicio = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);



    this.rodarRelatorio();
  }

  mudeiAqui(e, dados) {


    if (dados.PIC && dados.SIC) {
      if (dados.PIC.Idade + dados.SIC.Idade > 120)
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Tripulantes ${dados.PIC.Trato} e ${dados.SIC.Trato} não podem ser escalados juntos por superarem 120 anos na soma das idades` });

      if (this.incompatibilidades.filter(x => (x.Tripulante1.Id == dados.PIC.Id && x.Tripulante2.Id == dados.SIC.Id) || (x.Tripulante2.Id == dados.PIC.Id && x.Tripulante1.Id == dados.SIC.Id)).length != 0)
        this.messageService.add({ sticky: true, severity: 'error', summary: 'SOL Sistemas', detail: `Tripulantes ${dados.PIC.Trato} e ${dados.SIC.Trato} não podem ser escalados juntos por terem Incompatibilidade Presente` });

    }


    dados.Modificado = true;
  }

  rodarRelatorio() {

    let vencimentos = false;
    let duplas = false;

    this.apiEscala.getListasDupla(this.dataInicio).then(x => {
      this.tripulantes = x.tripulantes;
      this.bases = x.bases;
      this.prefixos = x.prefixos;
      this.incompatibilidades = x.incompatibilidades;
      vencimentos = true;
      this.tudoPronto = duplas && vencimentos;
      this.listarPendencias();
    })

    // this.apiEscala.getVencimentos(this.dataInicio).then(x=>{
    //   this.vencimentos = x;
    //   vencimentos = true;
    //   this.tudoPronto = duplas && vencimentos;
    // })

    this.apiEscala.getDuplas(this.dataInicio, this.dataFim).then(x => {
      this.duplas = x.Duplas;
      this.cursos = x.Cursos;
      duplas = true;
      this.tudoPronto = duplas && vencimentos;

      this.duplas.forEach(x => {
        x.Data = new Date(x.Data);
      })

      this.listarPendencias();
    });
  }
  listarPendencias() {
    if (!this.tudoPronto)
      return;


    this.duplas.forEach(d => {
      if (d.PIC) d.PIC = this.tripulantes.filter(x => x.Id == d.PIC.Id)[0];
      if (d.SIC) d.SIC = this.tripulantes.filter(x => x.Id == d.SIC.Id)[0];
    })


  }

  ngOnInit(): void {
  }

  novaLinha() {
    this.duplas.push({ Id: GuidUtil.NewGuid(), Base: undefined, Data: undefined, PIC: undefined, SIC: undefined, Apresentacao: undefined, Observacao: undefined, RepeteAte: undefined });
  }

  salvar() {


    let editado_novo = this.duplas.filter(x => x.Modificado);

    this.apiEscala.postDuplas(editado_novo).then(x => {


      let novos = x;

      novos.forEach(x => {
        x.Data = new Date(x.Data);
      })

      this.duplas.push.apply(this.duplas, novos);

      this.duplas.forEach(x => x.RepeteAte = undefined);

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
    })
  }

  delete() {

    let editado = this.duplas.filter(x => this.linhasSelecionadas.includes(x.Id));

    editado.forEach(x => x.Ativo = false);

    this.apiEscala.postDuplas(editado).then(x => {

      this.duplas = this.duplas.filter(x => !this.linhasSelecionadas.includes(x.Id));

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
    })

  }

  onRowEditInit(linha: any) {
    //this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(linha: any) {

  }

  onRowEditCancel(linha: any, index: number) {

  }

}
