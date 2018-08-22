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
    this.dataQuestao[e.name] = Number(e.value);
  }

}
