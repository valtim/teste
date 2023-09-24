import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-editar-curriculo',
  templateUrl: './editar-curriculo.component.html',
  styleUrls: ['./editar-curriculo.component.css'],
  providers: [MessageService]
})
export class EditarCurriculoComponent implements OnInit {

  @Input() curriculoSelecionado: any;
  @Output() retorno = new EventEmitter();

  mostrarLoading: boolean = false;
  locale_pt: string;

  constructor(private api: ApiService, private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
    this.mostrarLoading = false;
  }
}
