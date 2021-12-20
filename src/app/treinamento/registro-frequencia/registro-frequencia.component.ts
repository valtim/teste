import { Component, OnInit, Input } from "@angular/core";
import { DataUtil } from 'src/app/shared/DataUtil';
import { Turma } from "src/app/models/Turma";

@Component({
  selector: "app-registro-frequencia",
  templateUrl: "./registro-frequencia.component.html",
  styleUrls: ["./registro-frequencia.component.css"],
})
export class RegistroFrequenciaComponent implements OnInit {

  turma: Turma;
  periodoIndex = 0;
  @Input() diasTurma = [];
  @Input() iPeriodo: number;

  constructor(private turmaS: Turma) {}

  ngOnInit(): void {
    this.periodoIndex = this.iPeriodo ? this.iPeriodo : 0;
    //this.turma = this.turmaS.getTurma();
  }

  cargaHoraria() {
    // if(this.turma && this.turma.treinamento) {
    //   const inicio = this.turma.horasTurmas[this.periodoIndex].inicio;
    //   const termino = this.turma.horasTurmas[this.periodoIndex].termino;
    //   let minutos = DataUtil.horaToMinuto(termino) - DataUtil.horaToMinuto(inicio);
    //   return DataUtil.minutosToTimeStr(minutos);
    // }
  }
}
