import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-pesquisa-basica',
  templateUrl: './pesquisa-basica.component.html',
  styleUrls: ['./pesquisa-basica.component.css']
})
export class PesquisaBasicaComponent implements OnInit {

  fg: FormGroup;

  @Output() retorno = new EventEmitter();

  @Output() comeco = new EventEmitter();



  @Input() data;

  @Input() completa;

  @Input() tripulantes;

  @Input() niveis;


  locale_pt: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.locale_pt = this.api.getLocale('pt');
  }

  initForm() {
    this.fg = new FormGroup({});
    if ( !this.completa){
      this.fg.addControl('Data', new FormControl('', Validators.required));
      this.fg.patchValue({ Data: this.data });
      this.enviarForm();
      return;
    }


    // this.fg = this.fb.group({
    //   DataInicial: [ 'DataInicial', Validators.required ],
    //   DataFinal: [ 'DataFinal', Validators.required ],
    //   Tripulantes: this.fb.array(this.tripulantes.map(s => this.fb.control(true)))
    // })

    
    
    this.fg.addControl('DataInicial', new FormControl('', Validators.required));
    this.fg.patchValue({ DataInicial: this.data });
    this.fg.addControl('DataFinal', new FormControl('', Validators.required));
    this.fg.patchValue({ DataFinal: this.data });


    
    this.fg.addControl('Tripulantes', new FormControl('', Validators.required));
    this.fg.addControl('Niveis', new FormControl('', Validators.required));
    // this.tripulantes.forEach(t => {
    //   this.fg.addControl(t.Id, new FormControl(true));
    // });
    // this.fg.addControl(this.perguntas[i].Opcoes[j].Id, new FormControl());


    // let retorno = [];
    // this.tripulantes.forEach(x => {
    //         retorno.push({ Id: x.Id, Trato: x.Trato });

    //     });
    // this.enviarForm();
  }

  enviarForm() {
    //let obj =  

    this.comeco.emit(this.fg.value.Data ? this.fg.value.Data : this.fg.value.DataInicial);
    
    this.api.postGerenciaFadiga(Object.assign({}, this.fg.value)).then((response) => {

      this.retorno.emit(response);
    });
  }

}
