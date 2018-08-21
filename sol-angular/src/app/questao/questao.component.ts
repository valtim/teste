import { Component, OnInit, Input } from '@angular/core';
import { QuestaoService } from './questao.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  @Input() respostaBoa: string;
  @Input() respostaMa: string;
  @Input() name: string;

  constructor(private dataQuestao: QuestaoService) { }

  ngOnInit() {
  }

  onChange(e) {
    if (e.name === 'descanso' || e.name === 'concentrar') {
      this.dataQuestao[e.name] = e.value * 2;
    } else {
      this.dataQuestao[e.name] = e.value * 1;
    }
  }

}
