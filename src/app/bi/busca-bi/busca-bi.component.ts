import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-busca-bi',
  templateUrl: './busca-bi.component.html',
  styleUrls: ['./busca-bi.component.css'],
  providers: [MessageService]
})
export class BuscaBiComponent implements OnInit {

  dataInicio: Date;
  dataFim: Date;
  tudoPronto = false;
  
  constructor(
    private messageService: MessageService
    , private api: ApiService) { }

  ngOnInit(): void {
    let hoje = new Date();
    this.dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    this.dataFim = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    this.dataFim.setMonth(this.dataFim.getMonth() + 1);
    this.dataFim.setDate(this.dataFim.getDate() -1);
    this.tudoPronto = true;
  }

  rodarRelatorio(){
    this.tudoPronto = false;
    this.api.getBI(this.dataInicio, this.dataFim).subscribe(data => this.downloadFile(data)),//console.log(data),
    error => console.log('Error downloading the file.'),
    () => console.info('OK');

    // this.api.getBI(this.dataInicio, this.dataFim).then(x=>{
    //     window.open(x);
    // })
    this.tudoPronto = true;
  }


  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/ms-excel' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
