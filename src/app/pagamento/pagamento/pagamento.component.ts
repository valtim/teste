import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  constructor(private app: AppComponent, private api: ApiService) { }

  public tripulantes: any;
  public datas;
  public month;
  public loading = false;

  ngOnInit() {
    this.app.setTitle('Relatório de Pagamento');
    this.month = '';
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
    this.loading = true;
    this.api.getPagamento(this.month).then((data) => {
      this.tripulantes = data;
      this.loading = false;
    }).catch((error) => {
      console.log(error);
      this.loading = false;
    });
  }

}
