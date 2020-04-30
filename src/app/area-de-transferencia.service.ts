import { Injectable } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AreaDeTransferenciaService {

  constructor() { }

  adt;

  public setar(valor:any){
    this.adt = valor;
  }

  public buscar(){
    let retorno = this.adt;
    return retorno;
  }
}
