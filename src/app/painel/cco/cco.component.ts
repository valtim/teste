import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-cco',
  templateUrl: './cco.component.html',
  styleUrls: ['./cco.component.css']
})
export class CcoComponent implements OnInit {


  dados;

  constructor(
    private api: ApiService,) {

  }
  ngOnInit(): void {    

    this.myLoop();
  }

  myLoop() {         //  create a loop function
    this.carregarDados();
    setTimeout(() => {   //  call a 3s setTimeout when the loop is called
          this.myLoop();             //  ..  again which will trigger another 
     }, 30000)
  }


  carregarDados() {
    this.api.disponibilidade().then((x) => {
      this.dados = x;
    })
  }
}
