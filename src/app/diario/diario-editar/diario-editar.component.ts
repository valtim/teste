import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diario-editar',
  templateUrl: './diario-editar.component.html',
  styleUrls: ['./diario-editar.component.css']
})
export class DiarioEditarComponent implements OnInit {

  @Input()
  diario: any;

  constructor(private route: Router) { }

  ngOnInit() {
    // this.diario = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selectedId = +params.get('id');
    //     return this.service.getHeroes();
    //   })
    // );
    console.log(this.diario);
  }

}
