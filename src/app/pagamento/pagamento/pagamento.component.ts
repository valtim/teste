import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  constructor(private api: ApiService) { }
  private datas;
  private month;

  ngOnInit() {
    this.createData();
  }

  private createData() {
    const data = [];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const year = new Date().getFullYear();
    for (let index = 1; index <= 12; index++) {
      data.push({ value: year + '-' + (index < 10 ? '0' : '') + index + '-01', label: months[index - 1] + '-' + year });
    }
    this.datas = data;
  }

  changeData() {
    this.api.getPagamento(this.month).then(data => console.log(data));
  }

}
