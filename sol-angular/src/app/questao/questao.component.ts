import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent implements OnInit {

  @Input() respostaBoa: string;
  @Input() respostaMa: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
