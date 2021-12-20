import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Turma } from 'src/app/models/Turma';
import { AutorizacaoService } from 'src/app/shared/autorizacao.service';

@Component({
  selector: 'app-turma-status',
  templateUrl: './turma-status.component.html',
  styleUrls: ['./turma-status.component.css']
})
export class TurmaStatusComponent implements OnInit {

  @Input() turma: Turma;
  @Input() indexStatus: Number;
  items: MenuItem[];
  itemIndex: Number;
  private autorizacao: AutorizacaoService;

  constructor(private auth: AutorizacaoService, private cdr: ChangeDetectorRef) {
    this.autorizacao = auth;
    this.items = [];
  }

  formatarItem(indexStatus,index,efetivado) {
    let li = document.querySelectorAll('app-turma-status[ng-reflect-index-status=' + indexStatus + '] p-steps > div > ul > li');
    let numero = li.item(index).querySelector('a > span.p-steps-number');
    numero.innerHTML = '';

    if (efetivado) {
      if (!li.item(index).classList.contains("verde")) {
        li.item(index).classList.add('verde');
      }                
      this.itemIndex = index;
    } else {
      if (li.item(index).classList.contains("verde")) {
        li.item(index).classList.remove('verde');
      }
    }
  }

  ngOnInit(): void {
    this.itemIndex = 0;

    if (this.turma != null) {
      if (this.turma != undefined) {
        if (this.turma.TurmaStatus != null) {
          if (this.turma.TurmaStatus != undefined) {
            
            let lista = this.turma.TurmaStatus;
            if (lista.length == 0) {
              lista = [
                {Efetivada: false},{Efetivada: false},{Efetivada: false},
                {Efetivada: false},{Efetivada: false},{Efetivada: false}
              ];                      
            }

            lista.forEach( (status,index) => {
              this.items.push({label: ''});              
            });

          }
        }
      }
    }    
  }

  ngAfterViewInit(): void {
    this.turma.TurmaStatus.forEach( (status,index) => {
      this.formatarItem(this.indexStatus, index,status.Efetivada);
    });
    this.cdr.detectChanges();
  }

}
