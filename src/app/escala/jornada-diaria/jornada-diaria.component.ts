import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-jornada-diaria',
  templateUrl: './jornada-diaria.component.html',
  styleUrls: ['./jornada-diaria.component.css'],
  providers: [MessageService]
})
export class JornadaDiariaComponent implements OnInit {

  carregando: boolean = true;
  data: Date;
  locale_pt: any;
  dados: any;

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    const hoje = new Date();
    this.data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    this.carregando = false;

    // Para testes
    // this.data = new Date(hoje.getFullYear(), 5, 5);
    
    //this.rodar();
    //this.mock();
  }

  splitTimestamp(validar: boolean, hora: String): String {
    if ( (hora != null) && (hora != '') && (hora.includes(':')) && hora.length >= 4) {
      let partes = hora.split(':');

      let r = partes[0] + ':' + partes[1];
      if (validar) {
         if (r == '00:00') {
          return null;
         } else {
          return r;
         }
      } else {
        return r;
      }      
    }
    return null;
  }

  isNumeric(str: string): boolean {
    if (typeof str != "string") return false  
    return str != undefined && str != null && !isNaN(parseFloat(str))
  }

  stringToDate(hora: String): Date {    
    let retorno: Date = null;
    if ( (hora != null) && (hora != '') && (hora.includes(':')) && hora.length >= 4) {
      let partes = hora.split(':');
      if (this.isNumeric(partes[0]) && this.isNumeric(partes[1])) {
        let horas = parseInt(partes[0]);
        let minutos = parseInt(partes[1]);
        if ((horas >= 0) && (horas <= 23) && (minutos >= 0) && (minutos <= 59)) {
          retorno = new Date(
            this.data.getFullYear(),
            this.data.getMonth(),
            this.data.getDate(), horas, minutos, 0);                        
        }
      }
    }
    
    return retorno;
  }

  stringToDateValidado(hora: String): Date {    
    let retorno: Date = null;
    if ( (hora != null) && (hora != '') && (hora.includes(':')) && hora.length >= 4) {
      let partes = hora.split(':');
      if (this.isNumeric(partes[0]) && this.isNumeric(partes[1]) && this.isNumeric(partes[2])) {
        let horas = parseInt(partes[0]);
        let minutos = parseInt(partes[1]);
        let segundos = parseInt(partes[2]);
        if ((horas >= 0) && (horas <= 23) && (minutos >= 0) && (minutos <= 59)) {
          if ((horas == 0) && (minutos == 0) && (segundos == 0)) {
            // Neste caso o valor foi criado no Backend e não representa um horário válido
          } else {
            retorno = new Date(
              this.data.getFullYear(),
              this.data.getMonth(),
              this.data.getDate(), horas, minutos, 0);
          }                    
        }
      }
    }
    
    return retorno;
  }

  organizarDados(dados: any): any {
    return dados.map(obj => ({
      ...obj,
      valido: true,
      Apresentacao: this.splitTimestamp(false,obj.Apresentacao),
      Almoco1: obj.PossuiEscalaRealizada ? this.splitTimestamp(true,obj.Almoco1) : null,
      Fim1: obj.PossuiEscalaRealizada ? this.splitTimestamp(true,obj.Fim1) : null,
      Almoco2: obj.PossuiEscalaRealizada ? this.splitTimestamp(true,obj.Almoco2) : null,
      Fim2: obj.PossuiEscalaRealizada ? this.splitTimestamp(true,obj.Fim2) : null,
      FinalDaJornada: this.splitTimestamp(false,obj.FinalDaJornada),
      EscalaRealizada: {
        Apresentacao: this.stringToDate(obj.Apresentacao),
        Almoco1: obj.PossuiEscalaRealizada ? this.stringToDateValidado(obj.Almoco1) : null,
        Fim1: obj.PossuiEscalaRealizada ? this.stringToDateValidado(obj.Fim1) : null,
        Almoco2: obj.PossuiEscalaRealizada ? this.stringToDateValidado(obj.Almoco2) : null,
        Fim2: obj.PossuiEscalaRealizada ? this.stringToDateValidado(obj.Fim2) : null,
        FinalDaJornada: this.stringToDate(obj.FinalDaJornada),      
      }
    }));
  }

  converterData(data: Date): any {
    let retorno = {
      minutos: 0,
      ok: false
    };
    
    if (data != null) {
      retorno.minutos = (data.getHours() * 60) + data.getMinutes();
      retorno.ok = true;      
    }
    return retorno;
  }

  converterNumero(horas: number): any {
    let retorno = {
      minutos: 0,
      ok: false
    };
    
    if (horas != null) {
      retorno.minutos = horas * 60;
      retorno.ok = true;      
    }
    return retorno;
  }

  mensagemErro(msg: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg, life:10000 });
  }


  validarLinha(linha, callback) {
    linha.valido = true;
    
    let jornadaApresentacao = this.converterData(linha.EscalaRealizada.Apresentacao);
    let jornadaAlmoco1 = this.converterData(linha.EscalaRealizada.Almoco1);
    let jornadaFim1 = this.converterData(linha.EscalaRealizada.Fim1);
    let jornadaAlmoco2 = this.converterData(linha.EscalaRealizada.Almoco2);
    let jornadaFim2 = this.converterData(linha.EscalaRealizada.Fim2);
    let jornadaFinalDaJornada = this.converterData(linha.EscalaRealizada.FinalDaJornada);

    let vinteQuatroHoras = this.converterNumero(24).minutos;
    let seisHoras = this.converterNumero(6).minutos;
    let umHora = this.converterNumero(1).minutos;

    
    // Preencher pelo menos Apresentação e Fim da Jornada
    if (!jornadaApresentacao.ok || !jornadaFinalDaJornada.ok) {
      this.mensagemErro(`Deve-se preencher a Apresentação e o Fim da Jornada!`);
      linha.valido = false;
      callback(false);
      return;
    }    

    let horarioProxDia = ( (jornadaFinalDaJornada.minutos >= 0) && (jornadaFinalDaJornada.minutos <= seisHoras) );
    let horarioNesteDia = !horarioProxDia;

    // Aqui a Final da Jornada não pode ser menor que a Apresentacao, porém ha casos
    // que ela termina no outro dia (ai pode).
    if (jornadaApresentacao.ok && jornadaFinalDaJornada.ok) {      
      if (horarioNesteDia) {        
        if (jornadaFinalDaJornada.minutos <= jornadaApresentacao.minutos) {
          this.mensagemErro(`O Fim da Jornada deve ser maior que a Apresentação!`);
          linha.valido = false;
          callback(false);
          return;
        }
      }            
    }

    // Validacao Basica
    if ((!jornadaAlmoco1.ok && jornadaFim1.ok) || (jornadaAlmoco1.ok && !jornadaFim1.ok)) {
      this.mensagemErro(`Os Almoços devem ter início e fim!`);
      linha.valido = false;
      callback(false);
      return;     
    }
    if ((!jornadaAlmoco2.ok && jornadaFim2.ok) || (jornadaAlmoco2.ok && !jornadaFim2.ok)) {
      this.mensagemErro(`Os Almoços devem ter início e fim!`);
      linha.valido = false;
      callback(false);
      return;     
    }
    
    if (jornadaAlmoco1.ok && jornadaFim1.ok) {
      if (jornadaFim1.minutos <= jornadaAlmoco1.minutos) {
        this.mensagemErro(`O fim do Almoço devem ser maior que o início!`);
        linha.valido = false;
        callback(false);
        return;
      }
    }
    if (jornadaAlmoco2.ok && jornadaFim2.ok) {
      if (jornadaFim2.minutos <= jornadaAlmoco2.minutos) {
        this.mensagemErro(`O fim do Almoço devem ser maior que o início!`);
        linha.valido = false;
        callback(false);
        return;
      }
    }

    if (jornadaApresentacao.ok && jornadaAlmoco1.ok && jornadaFim1.ok) {
      if ((jornadaApresentacao.minutos >= jornadaAlmoco1.minutos) && (jornadaApresentacao.minutos <= jornadaFim1.minutos)) {
        this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
        linha.valido = false;
        callback(false);
        return;
      }
    }
    if (jornadaApresentacao.ok && jornadaAlmoco2.ok && jornadaFim2.ok) {
      if ((jornadaApresentacao.minutos >= jornadaAlmoco2.minutos) && (jornadaApresentacao.minutos <= jornadaFim2.minutos)) {
        this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
        linha.valido = false;
        callback(false);
        return;
      }
    }

    if (jornadaFinalDaJornada.ok && jornadaAlmoco1.ok && jornadaFim1.ok) {      
      if (horarioNesteDia) {        
        if ((jornadaFinalDaJornada.minutos >= jornadaAlmoco1.minutos) && (jornadaFinalDaJornada.minutos <= jornadaFim1.minutos)) {
          this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
          linha.valido = false;
          callback(false);
          return;
        } 
      }      
    }
    if (jornadaFinalDaJornada.ok && jornadaAlmoco2.ok && jornadaFim2.ok) {
      if (horarioNesteDia) {        
        if ((jornadaFinalDaJornada.minutos >= jornadaAlmoco2.minutos) && (jornadaFinalDaJornada.minutos <= jornadaFim2.minutos)) {
          this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
          linha.valido = false;
          callback(false);
          return;
        }  
      }        
    }

    if (jornadaApresentacao.ok && jornadaAlmoco1.ok && jornadaFim1.ok) {
      if ((jornadaApresentacao.minutos >= jornadaAlmoco1.minutos) && (jornadaApresentacao.minutos >= jornadaFim1.minutos)) {
        this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
        linha.valido = false;
        callback(false);
        return;
      }
    }
    if (jornadaApresentacao.ok && jornadaAlmoco2.ok && jornadaFim2.ok) {
      if ((jornadaApresentacao.minutos >= jornadaAlmoco2.minutos) && (jornadaApresentacao.minutos >= jornadaFim2.minutos)) {
        this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
        linha.valido = false;
        callback(false);
        return;
      }
    }

    if (jornadaFinalDaJornada.ok && jornadaAlmoco1.ok && jornadaFim1.ok) {
      if (horarioNesteDia) {
        if ((jornadaFinalDaJornada.minutos <= jornadaAlmoco1.minutos) && (jornadaFinalDaJornada.minutos <= jornadaFim1.minutos)) {
          this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
          linha.valido = false;
          callback(false);
          return;
        }  
      }            
    }
    if (jornadaFinalDaJornada.ok && jornadaAlmoco2.ok && jornadaFim2.ok) {
      if (horarioNesteDia) {
        if ((jornadaFinalDaJornada.minutos <= jornadaAlmoco2.minutos) && (jornadaFinalDaJornada.minutos <= jornadaFim2.minutos)) {
          this.mensagemErro(`O Almoço não pode ser fora da jornada de trabalho (veja Apresentação ou Fim da Jornada).`);
          linha.valido = false;
          callback(false);
          return;
        }          
      }          
    }

    // Os horários dos almoços não pode se cruzar
    if (jornadaAlmoco1.ok && jornadaFim1.ok && jornadaAlmoco2.ok && jornadaFim2.ok) {
      if (
        (jornadaAlmoco1.minutos >= jornadaAlmoco2.minutos) ||
        (jornadaFim1.minutos >= jornadaAlmoco2.minutos) ||
        (jornadaFim1.minutos >= jornadaFim2.minutos)
      ) {
        this.mensagemErro(`Os horários de almoço não pode ter interseção. O segundo horário de almoço deve ser posterior ao primeiro.`);
        linha.valido = false;
        callback(false);
        return;
      }
    }

    // Intervalo de Almoço não pode ser menor que 1h
    if (jornadaAlmoco1.ok && jornadaFim1.ok) {
      if (jornadaFim1.minutos < (jornadaAlmoco1.minutos + umHora)) {
        this.mensagemErro(`O intervalo do Almoço não pode ser inferior à 1h!`);
        linha.valido = false;
        callback(false);
        return;
      }
    }
    if (jornadaAlmoco2.ok && jornadaFim2.ok) {
      if (jornadaFim2.minutos < (jornadaAlmoco2.minutos + umHora)) {
        this.mensagemErro(`O intervalo do Almoço não pode ser inferior à 1h!`);
        linha.valido = false;
        callback(false);
        return;
      }
    }

    // Cada etapa não pode passar de 6h
    if (
        (jornadaApresentacao.ok && jornadaFinalDaJornada.ok) &&
        (!jornadaAlmoco1.ok && !jornadaFim1.ok && !jornadaAlmoco2.ok && !jornadaFim2.ok)
      ) {
        
        if (horarioProxDia) {          
          if ((jornadaFinalDaJornada.minutos + vinteQuatroHoras) > (jornadaApresentacao.minutos + seisHoras)) {
            this.mensagemErro(`A jornada (sem Almoço) não pode ser superior a 6 horas!`);
            linha.valido = false;
            callback(false);
            return;
          }
        } else {
          if (jornadaFinalDaJornada.minutos > (jornadaApresentacao.minutos + seisHoras)) {
            this.mensagemErro(`A jornada (sem Almoço) não pode ser superior a 6 horas!`);
            linha.valido = false;
            callback(false);
            return;
          }         
        }            
    }
    if (jornadaApresentacao.ok && jornadaAlmoco1.ok) {        
      if (jornadaAlmoco1.minutos > (jornadaApresentacao.minutos + seisHoras)) {
        this.mensagemErro(`O intervalo entre a Apresentação e o Almoço deve ser inferior a 6 horas!`);
        linha.valido = false;
        callback(false);
        return;
      }      
    }
    if (jornadaFim1.ok && jornadaAlmoco2.ok) {        
      if (jornadaAlmoco2.minutos > (jornadaFim1.minutos + seisHoras)) {
        this.mensagemErro(`O intervalo entre os Almoços deve ser inferior a 6 horas!`);
        linha.valido = false;
        callback(false);
        return;
      }      
    }
    if (jornadaFinalDaJornada.ok && jornadaFim1.ok && !jornadaFim2.ok) {        
      if (horarioProxDia) {
        if ( ((jornadaFinalDaJornada.minutos + vinteQuatroHoras) - jornadaFim1.minutos) > seisHoras) {
          this.mensagemErro(`O intervalo entre o Almoço e o Fim da Jornada deve ser inferior a 6 horas!`);
          linha.valido = false;
          callback(false);
          return;
        }
      } else {
        if ((jornadaFinalDaJornada.minutos - jornadaFim1.minutos) > seisHoras) {
          this.mensagemErro(`O intervalo entre o Almoço e o Fim da Jornada deve ser inferior a 6 horas!`);
          linha.valido = false;
          callback(false);
          return;
        }
      }        
    }
    if (jornadaFinalDaJornada.ok && jornadaFim1.ok && jornadaFim2.ok) {
      if (horarioProxDia) {
        if ( ((jornadaFinalDaJornada.minutos + vinteQuatroHoras) - jornadaFim2.minutos) > seisHoras) {
          this.mensagemErro(`O intervalo entre o Almoço e o Fim da Jornada deve ser inferior a 6 horas!`);
          linha.valido = false;
          callback(false);
          return;
        }
      } else {
        if ( (jornadaFinalDaJornada.minutos - jornadaFim2.minutos) > seisHoras) {
          this.mensagemErro(`O intervalo entre o Almoço e o Fim da Jornada deve ser inferior a 6 horas!`);
          linha.valido = false;
          callback(false);
          return;
        }
      }             
    }

    if (linha.CompararVoos.length > 0) {

      for (let indexVoo=0; indexVoo < linha.CompararVoos.length; indexVoo++) {

        let voo = linha.CompararVoos[indexVoo];
        let vooPartida = this.converterData(new Date(voo.Partida));
        let vooCorte = this.converterData(new Date(voo.Corte));      
  
        // Todos os voos tem que ficar dentro do intervalo de jornada de trabalho, ou seja da apresentação ao final, fora o almoço        
        if (jornadaApresentacao.ok && vooPartida.ok) {
          if (jornadaApresentacao.minutos >= vooPartida.minutos) {
            this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
            linha.valido = false;
            callback(false);
            return;
          }
        }
        if (jornadaFinalDaJornada.ok && vooPartida.ok && vooCorte.ok) {
          if (horarioNesteDia) {
            if ((jornadaFinalDaJornada.minutos >= vooPartida.minutos) && (jornadaFinalDaJornada.minutos <= vooCorte.minutos)) {
              this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
              linha.valido = false;
              callback(false);
              return;
            }
          }        
        }
        if (jornadaAlmoco1.ok && jornadaFim1.ok && vooPartida.ok) {
          if ((vooPartida.minutos >= jornadaAlmoco1.minutos) && (vooPartida.minutos <= jornadaFim1.minutos)) {            
            this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
            linha.valido = false;
            callback(false);
            return;
          }
        }
        if (jornadaAlmoco2.ok && jornadaFim2.ok && vooPartida.ok) {
          if ((vooPartida.minutos >= jornadaAlmoco2.minutos) && (vooPartida.minutos <= jornadaFim2.minutos)) {            
            this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
            linha.valido = false;
            callback(false);
            return;
          }
        }
        if (jornadaFim1.ok && vooPartida.ok && vooCorte.ok) {
          if ((jornadaFim1.minutos >= vooPartida.minutos) && (jornadaFim1.minutos <= vooCorte.minutos)) {
            this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
            linha.valido = false;
            callback(false);
            return;
          }
        }
        if (jornadaFim2.ok && vooPartida.ok && vooCorte.ok) {
          if ((jornadaFim2.minutos >= vooPartida.minutos) && (jornadaFim2.minutos <= vooCorte.minutos)) {
            this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
            linha.valido = false;
            callback(false);
            return;
          }
        }
        if (jornadaFinalDaJornada.ok && vooPartida.ok) {
          if (horarioNesteDia) {
            if (jornadaFinalDaJornada.minutos < vooPartida.minutos) {
              this.mensagemErro(`Os voos não podem estar fora da jornada de trabalho. Veja os valores da Apresentação, do Fim Da Jornada e dos Almoços.`);
              linha.valido = false;
              callback(false);
              return;
            }
          }          
        }

        // O Início de voo tem que ser 30 min depois de refeição
        if (jornadaAlmoco1.ok && jornadaFim1.ok && vooPartida.ok) {
          if (((jornadaFim1.minutos + 30) > vooPartida.minutos) && (jornadaAlmoco1.minutos < vooPartida.minutos)) {
            this.mensagemErro(`O início do voo deve ser 30 minutos após a refeição!`);
            linha.valido = false;
            callback(false);
            return;
          }
        }
        if (jornadaAlmoco2.ok && jornadaFim2.ok && vooPartida.ok) {
          if (((jornadaFim2.minutos + 30) > vooPartida.minutos) && (jornadaAlmoco2.minutos < vooPartida.minutos)) {
            this.mensagemErro(`O início do voo deve ser 30 minutos após a refeição!`);
            linha.valido = false;
            callback(false);
            return;
          }
        }        

        // O último corte tem que ser 30 minutos antes da hora do fim da jornada
        if (jornadaFinalDaJornada.ok && vooCorte.ok) {
          if (horarioProxDia) {
            if (vooCorte.minutos > (jornadaFinalDaJornada.minutos + vinteQuatroHoras - 30)) {
              this.mensagemErro(`O Corte deve ser 30 minutos antes do Fim da Jornada!`);
              linha.valido = false;
              callback(false);
              return;
            }
          } else {
            if (vooCorte.minutos > (jornadaFinalDaJornada.minutos - 30)) {
              this.mensagemErro(`O Corte deve ser 30 minutos antes do Fim da Jornada!`);
              linha.valido = false;
              callback(false);
              return;
            }
          }          
        }

        if (indexVoo == (linha.CompararVoos.length - 1)) {
          console.log('Validação realizada com sucesso!');
          callback(true);
        }
      }

    } else {
        console.log('Validação realizada com sucesso!');
        callback(true);
    }    
  }

  validarHoras(linha) {
    this.carregando = true;

    linha.EscalaRealizada.Apresentacao = this.stringToDate(linha.Apresentacao);
    linha.EscalaRealizada.Almoco1 = this.stringToDate(linha.Almoco1);
    linha.EscalaRealizada.Fim1 = this.stringToDate(linha.Fim1);
    linha.EscalaRealizada.Almoco2 = this.stringToDate(linha.Almoco2);
    linha.EscalaRealizada.Fim2 = this.stringToDate(linha.Fim2);
    linha.EscalaRealizada.FinalDaJornada = this.stringToDate(linha.FinalDaJornada);
    
    // Ajuste para Final da Jornada no dia seguinte
    if ((linha.EscalaRealizada.FinalDaJornada != null) && (linha.EscalaRealizada.Apresentacao != null)) {
      if (linha.EscalaRealizada.FinalDaJornada.getHours() < linha.EscalaRealizada.Apresentacao.getHours()) {
        if (linha.EscalaRealizada.FinalDaJornada.getHours() < 6) {
          linha.EscalaRealizada.FinalDaJornada.setDate(
            linha.EscalaRealizada.FinalDaJornada.getDate() + 1
          );
        }
      }
    }    

    this.validarLinha(linha, validado=>{
      if (validado) {
        let escala = this.criarEscalaRealizada(linha);
        this.api.salvarJornadaDiaria(escala).then(retorno => {
          this.carregando = false;

          if (retorno.Salvo) {
            console.log('Escala salva com sucesso!');
          } else {
            console.error(retorno.Mensagem);
            this.mensagemErro(`Erro ao salvar a escala!`);          
          }               
        }).catch((x) => {
          console.error(x);
          this.mensagemErro(`Erro ao salvar a escala!`);
        });
      } else {
        this.carregando = false;
      }
    });    
  }

  rodar(): void {
    this.carregando = true;
    
    this.api.getJornadaDiaria(this.data).then((dados) => {
      this.dados = this.organizarDados(dados);
      this.carregando = false;
      
      // Para testar
      // console.log(JSON.stringify(this.dados));
    });
  }

  toISO(data: Date): string {
    if (data != null) {      
      // Ajustar Timezone
      data.setHours( data.getHours() - 3 );
      return data.toISOString();
    } else {
      return null;
    }
  }

  criarEscalaRealizada(linha: any): any {

    let SemAlmoco: boolean = true;
    if ((linha.EscalaRealizada.Almoco1 != null) || (linha.EscalaRealizada.Almoco2 != null)) {
      SemAlmoco = false;
    }

    let escala = {
      Id: linha.IdEscalaRealizada,
      Ativo: true,
      DomingoOuFeriado: linha.DomingoOuFeriado,
      Data: linha.Data,
      Apresentacao: this.toISO(linha.EscalaRealizada.Apresentacao),
      Almoco: this.toISO(linha.EscalaRealizada.Almoco1),
      FimAlmoco: this.toISO(linha.EscalaRealizada.Fim1),
      Almoco2: this.toISO(linha.EscalaRealizada.Almoco2),
      FimAlmoco2: this.toISO(linha.EscalaRealizada.Fim2),
      FimDaJornada: this.toISO(linha.EscalaRealizada.FinalDaJornada),
      SemAlmoco: SemAlmoco,
      OrdemDeExibicao: 0,
      TempoDeSono: 0,
      QualidadeDoSono: 0,
      Tripulante: linha.Tripulante
    };

    return escala;
  }
  
  mock(): void {
    let dados = `[{"IdEscalaRealizada":"715e9370-4582-41ff-89e4-9ca501c06faa","IdTripulantes":"30ce7ed6-e078-11e7-a923-0026b94bb39e","TratoTripulante":"CHICRALLA","Apresentacao":"13:00","Almoco1":"17:00","Fim1":"18:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"00:15","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce7ed6-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T14:44:27","Sincronizacao":"2022-11-25T22:53:56","CodigoANAC":115630,"Trato":"CHICRALLA","Email":"cristiano.almeida@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Cristiano CHICRALLA de Almeida","UltimoPeso":187,"UltimoPesoDeBagagem":0,"Nascimento":"1977-06-24T00:00:00","Identidade":"","CPF":"080.687.947-51","Licenca":"PLAH 02376","Endereco":"","Idioma":"","Admissao":"2011-07-01T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110253","Hash":null,"CodigoPetrobras":"44958455","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"1986","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":46,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":84.8,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T16:00:00.000Z","Almoco1":"2023-06-05T20:00:00.000Z","Fim1":"2023-06-05T21:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T03:15:00.000Z"}},{"IdEscalaRealizada":"b4d214ea-452e-4df5-8b40-e02ddcc962d2","IdTripulantes":"be8b7292-8fe3-4f15-9b35-1f33327b96e6","TratoTripulante":"GILVAN","Apresentacao":"13:00","Almoco1":"19:00","Fim1":"20:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"00:15","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"be8b7292-8fe3-4f15-9b35-1f33327b96e6","Ativo":true,"Atualizacao":"2023-05-25T09:52:34","Sincronizacao":"2023-03-21T15:49:08","CodigoANAC":111474,"Trato":"GILVAN","Email":"gilvan.filho@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"GILVAN Correia Barros Filho","UltimoPeso":175.9,"UltimoPesoDeBagagem":0,"Nascimento":"1962-09-10T00:00:00","Identidade":"","CPF":"331.106.544-15","Licenca":"PLAH 00809","Endereco":"NOSSA SENHORA DE LOURDES, Nº 150 - SAO FRANCISCO - Niterói - 24360420","Idioma":"PORTUGUÊS NÍVEL 6","Admissao":"2023-01-16T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111919","Hash":null,"CodigoPetrobras":"43729833","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2640","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":61,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":79.8,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T16:00:00.000Z","Almoco1":"2023-06-05T22:00:00.000Z","Fim1":"2023-06-05T23:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T03:15:00.000Z"}},{"IdEscalaRealizada":"8a853ef6-abdc-46b2-b4e3-5b7e54185560","IdTripulantes":"30ce817e-e078-11e7-a923-0026b94bb39e","TratoTripulante":"FREDERICO","Apresentacao":"00:00","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"00:00","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce817e-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T14:51:43","Sincronizacao":"2022-11-25T22:55:23","CodigoANAC":102133,"Trato":"FREDERICO","Email":"frederico.soares@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"FREDERICO Fredericci Soares","UltimoPeso":209.4,"UltimoPesoDeBagagem":0,"Nascimento":"1971-12-17T00:00:00","Identidade":"","CPF":"158.470.058-06","Licenca":"PLAH 02282","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6 ","Admissao":"2011-02-07T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110278","Hash":null,"CodigoPetrobras":"44862170","Justificativa":null,"Bolinha":"amarela","MatriculaInterna":"1918","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":51,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":95,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T03:00:00.000Z","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T03:00:00.000Z"}},{"IdEscalaRealizada":"872b1038-e07b-4446-a873-a4680d84c937","IdTripulantes":"fc3a916f-1cd6-408c-97af-f44d8a8f4611","TratoTripulante":"SOARES","Apresentacao":"06:00","Almoco1":null,"Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"13:00","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"fc3a916f-1cd6-408c-97af-f44d8a8f4611","Ativo":true,"Atualizacao":"2023-05-25T15:12:18","Sincronizacao":"2023-02-12T17:32:49","CodigoANAC":128799,"Trato":"SOARES","Email":"vinicius.vale@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Vinicius SOARES do Vale","UltimoPeso":185.2,"UltimoPesoDeBagagem":0,"Nascimento":"1979-03-07T00:00:00","Identidade":"","CPF":"086.065.807-40","Licenca":"PCH 03769","Endereco":"","Idioma":"ENGLISH LEVEL 4","Admissao":"2022-07-18T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111013","Hash":null,"CodigoPetrobras":"48596001","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2613","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":44,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":84,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":null,"Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T16:00:00.000Z"}},{"IdEscalaRealizada":"3bf0741c-12ad-4a52-b12c-c5135da34b1c","IdTripulantes":"30ce84a8-e078-11e7-a923-0026b94bb39e","TratoTripulante":"NATHÁLIA","Apresentacao":"13:00","Almoco1":"17:00","Fim1":"18:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"21:30","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce84a8-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T15:06:16","Sincronizacao":"2022-11-25T22:58:31","CodigoANAC":156585,"Trato":"NATHÁLIA","Email":"nathalia.santos@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"NATHALIA Correa dos Santos","UltimoPeso":136,"UltimoPesoDeBagagem":0,"Nascimento":"1986-11-04T00:00:00","Identidade":"","CPF":"058.106.167-55","Licenca":"PLAH 02738","Endereco":"","Idioma":"ENGLISH LEVEL 4 ","Admissao":"2013-08-12T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110334","Hash":null,"CodigoPetrobras":"49540746","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"2136","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":36,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":61.7,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T16:00:00.000Z","Almoco1":"2023-06-05T20:00:00.000Z","Fim1":"2023-06-05T21:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-06T00:30:00.000Z"}},{"IdEscalaRealizada":"84fd957e-d0cc-4e11-82e1-64cb53d1e247","IdTripulantes":"30ce8228-e078-11e7-a923-0026b94bb39e","TratoTripulante":"HAMILTON","Apresentacao":"13:00","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"21:30","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce8228-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T14:55:26","Sincronizacao":"2022-11-25T22:55:59","CodigoANAC":131059,"Trato":"HAMILTON","Email":"hamilton.castro@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"HAMILTON Carlos Fonseca de Castro","UltimoPeso":180.3,"UltimoPesoDeBagagem":0,"Nascimento":"1963-09-22T00:00:00","Identidade":"","CPF":"706.241.787-49","Licenca":"PLAH 02640","Endereco":"","Idioma":"ENGLISH LEVEL 4","Admissao":"2011-04-01T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110284","Hash":null,"CodigoPetrobras":"46461590","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"110284","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":59,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":81.8,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T16:00:00.000Z","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-06T00:30:00.000Z"}},{"IdEscalaRealizada":"45b3dfef-d9e1-4387-9056-00d6a542fbb5","IdTripulantes":"45bcd986-7339-4f21-9eb9-6b1e7e4751ee","TratoTripulante":"SCATOLINI","Apresentacao":"06:00","Almoco1":"11:40","Fim1":"12:40","Almoco2":null,"Fim2":null,"FinalDaJornada":"17:55","Voos":["(07:44-08:20)","(08:20-08:40)","(08:40-09:17)","(09:51-10:25)","(10:25-11:05)"],"CompararVoos":[{"Partida":"2023-06-05T07:44:00","Corte":"2023-06-05T08:20:00"},{"Partida":"2023-06-05T08:20:00","Corte":"2023-06-05T08:40:00"},{"Partida":"2023-06-05T08:40:00","Corte":"2023-06-05T09:17:00"},{"Partida":"2023-06-05T09:51:00","Corte":"2023-06-05T10:25:00"},{"Partida":"2023-06-05T10:25:00","Corte":"2023-06-05T11:05:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"45bcd986-7339-4f21-9eb9-6b1e7e4751ee","Ativo":true,"Atualizacao":"2023-05-25T15:11:35","Sincronizacao":"2023-02-12T19:44:05","CodigoANAC":126438,"Trato":"SCATOLINI","Email":"filippo.scatolini@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Filippo SCATOLINI","UltimoPeso":154.3,"UltimoPesoDeBagagem":0,"Nascimento":"1984-07-19T00:00:00","Identidade":"320630845","CPF":"311.353.858-07","Licenca":"PLAH 02676","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6","Admissao":"2022-01-17T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110736","Hash":null,"CodigoPetrobras":"48693790","Justificativa":null,"Bolinha":null,"MatriculaInterna":"110736","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":39,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":70,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:40:00.000Z","Fim1":"2023-06-05T15:40:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T20:55:00.000Z"}},{"IdEscalaRealizada":"d5cd54f3-929d-424b-8dd1-f3664b56a829","IdTripulantes":"72e1b50c-c563-454e-aa0a-7afbc7b40b91","TratoTripulante":"EDUARDO","Apresentacao":"06:00","Almoco1":"11:30","Fim1":"12:30","Almoco2":null,"Fim2":null,"FinalDaJornada":"16:00","Voos":["(07:44-08:20)","(08:20-08:40)","(08:40-09:17)","(09:51-10:25)","(10:25-11:05)"],"CompararVoos":[{"Partida":"2023-06-05T07:44:00","Corte":"2023-06-05T08:20:00"},{"Partida":"2023-06-05T08:20:00","Corte":"2023-06-05T08:40:00"},{"Partida":"2023-06-05T08:40:00","Corte":"2023-06-05T09:17:00"},{"Partida":"2023-06-05T09:51:00","Corte":"2023-06-05T10:25:00"},{"Partida":"2023-06-05T10:25:00","Corte":"2023-06-05T11:05:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"72e1b50c-c563-454e-aa0a-7afbc7b40b91","Ativo":true,"Atualizacao":"2023-05-25T09:44:24","Sincronizacao":"2023-04-20T19:15:28","CodigoANAC":847590,"Trato":"EDUARDO","Email":"eduardo.giacomin@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"EDUARDO Andrade Giacomini","UltimoPeso":198,"UltimoPesoDeBagagem":0,"Nascimento":"1967-10-13T00:00:00","Identidade":"671124","CPF":"959.718.317-04","Licenca":"PCH 03794","Endereco":"RUA DESEMBARGADOR CARLOS XAVIER PAES, Nº 73 - MATA DA PRAIA - VITORIA - ES","Idioma":"ENGLISH LEVEL 6","Admissao":"2023-02-16T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111970","Hash":null,"CodigoPetrobras":"48481180","Justificativa":null,"Bolinha":null,"MatriculaInterna":null,"ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":55,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":89.8,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:30:00.000Z","Fim1":"2023-06-05T15:30:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T19:00:00.000Z"}},{"IdEscalaRealizada":"c08379f4-79f5-4508-a13f-5b4bd0a7aac1","IdTripulantes":"30ce8f66-e078-11e7-a923-0026b94bb39e","TratoTripulante":"VITOR","Apresentacao":"06:10","Almoco1":"11:00","Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"16:00","Voos":["(07:56-09:05)","(09:05-10:17)"],"CompararVoos":[{"Partida":"2023-06-05T07:56:00","Corte":"2023-06-05T09:05:00"},{"Partida":"2023-06-05T09:05:00","Corte":"2023-06-05T10:17:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce8f66-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T15:14:46","Sincronizacao":"2022-11-25T23:00:51","CodigoANAC":124078,"Trato":"VITOR","Email":"vitor.mesquita@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"VITOR Lucas de Mesquita","UltimoPeso":162.7,"UltimoPesoDeBagagem":0,"Nascimento":"1986-11-09T00:00:00","Identidade":"","CPF":"016.479.991-54","Licenca":"PLAH 02673","Endereco":"","Idioma":"ENGLISH LEVEL 5","Admissao":"2017-01-27T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110366","Hash":null,"CodigoPetrobras":"45155042","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"2373","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":36,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":73.8,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:10:00.000Z","Almoco1":"2023-06-05T14:00:00.000Z","Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T19:00:00.000Z"}},{"IdEscalaRealizada":"71c55fa6-5d67-4974-986b-58fbead160b3","IdTripulantes":"30ce8bb0-e078-11e7-a923-0026b94bb39e","TratoTripulante":"VILA LIMA","Apresentacao":"06:10","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"18:08","Voos":["(07:56-09:05)","(09:05-10:17)"],"CompararVoos":[{"Partida":"2023-06-05T07:56:00","Corte":"2023-06-05T09:05:00"},{"Partida":"2023-06-05T09:05:00","Corte":"2023-06-05T10:17:00"}],"PossuiEscalaRealizada":false,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce8bb0-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-06-02T17:05:06","Sincronizacao":"2022-08-04T16:04:04","CodigoANAC":103253,"Trato":"VILA LIMA","Email":"paulo.lima@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Paulo Sergio Dutra Vila Lima","UltimoPeso":141.1,"UltimoPesoDeBagagem":0,"Nascimento":"1966-10-31T00:00:00","Identidade":"6083102795","CPF":"087.414.858-82","Licenca":"PLAH 02458","Endereco":"","Idioma":"ENGLISH LEVEL 5","Admissao":"0001-01-01T00:00:00","Desligamento":null,"IdentificadorCliente":"","SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110340","Hash":null,"CodigoPetrobras":"49963952","Justificativa":null,"Bolinha":null,"MatriculaInterna":"110340","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":56,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":64,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:10:00.000Z","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T21:08:00.000Z"}},{"IdEscalaRealizada":"f3ba2971-9d2c-41f2-ae5c-ceb9ecedb69a","IdTripulantes":"30ce8f20-e078-11e7-a923-0026b94bb39e","TratoTripulante":"BOMFIM","Apresentacao":"07:30","Almoco1":"13:00","Fim1":"14:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"16:30","Voos":["(08:22-09:02)","(09:02-09:45)","(11:23-12:04)","(12:04-12:21)","(12:21-13:02)"],"CompararVoos":[{"Partida":"2023-06-05T08:22:00","Corte":"2023-06-05T09:02:00"},{"Partida":"2023-06-05T09:02:00","Corte":"2023-06-05T09:45:00"},{"Partida":"2023-06-05T11:23:00","Corte":"2023-06-05T12:04:00"},{"Partida":"2023-06-05T12:04:00","Corte":"2023-06-05T12:21:00"},{"Partida":"2023-06-05T12:21:00","Corte":"2023-06-05T13:02:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce8f20-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T15:18:34","Sincronizacao":"2022-11-25T22:52:50","CodigoANAC":680710,"Trato":"BOMFIM","Email":"luiz.rosa@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Luiz Otavio BOMFIM da Rosa","UltimoPeso":187,"UltimoPesoDeBagagem":0,"Nascimento":"1963-07-17T00:00:00","Identidade":"","CPF":"404.683.640-72","Licenca":"PLAH 01803","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6 ","Admissao":"2017-01-27T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110316","Hash":null,"CodigoPetrobras":"41920957","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"110316","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":60,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":84.8,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T10:30:00.000Z","Almoco1":"2023-06-05T16:00:00.000Z","Fim1":"2023-06-05T17:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T19:30:00.000Z"}},{"IdEscalaRealizada":"0c2c1dc7-1dfa-4359-884a-603be496eb9e","IdTripulantes":"f00fefa4-e55e-4305-a88d-c12b37ed430f","TratoTripulante":"RULIM","Apresentacao":"07:30","Almoco1":"13:00","Fim1":"14:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"17:00","Voos":["(08:22-09:02)","(09:02-09:45)","(11:23-12:04)","(12:04-12:21)","(12:21-13:02)"],"CompararVoos":[{"Partida":"2023-06-05T08:22:00","Corte":"2023-06-05T09:02:00"},{"Partida":"2023-06-05T09:02:00","Corte":"2023-06-05T09:45:00"},{"Partida":"2023-06-05T11:23:00","Corte":"2023-06-05T12:04:00"},{"Partida":"2023-06-05T12:04:00","Corte":"2023-06-05T12:21:00"},{"Partida":"2023-06-05T12:21:00","Corte":"2023-06-05T13:02:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"f00fefa4-e55e-4305-a88d-c12b37ed430f","Ativo":true,"Atualizacao":"2023-05-25T10:11:57","Sincronizacao":"2023-02-09T10:27:05","CodigoANAC":107838,"Trato":"RULIM","Email":"antonio.rulim@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Antonio Lisomar  RULIM","UltimoPeso":160.9,"UltimoPesoDeBagagem":0,"Nascimento":"1974-12-13T00:00:00","Identidade":"","CPF":"541.477.353-04","Licenca":"PLAH 02095","Endereco":"JOAO LOPES DE LIMA, nº 972 -  JD SAPOPEMBA - São Paulo - 03976020","Idioma":"POTUGUÊS 6","Admissao":"2022-12-01T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111817","Hash":null,"CodigoPetrobras":"45006073","Justificativa":null,"Bolinha":null,"MatriculaInterna":"","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":48,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":73,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T10:30:00.000Z","Almoco1":"2023-06-05T16:00:00.000Z","Fim1":"2023-06-05T17:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T20:00:00.000Z"}},{"IdEscalaRealizada":"d768508f-42d9-493f-ba4b-4828fe67a46f","IdTripulantes":"5129023c-2add-4476-acb1-71efb29da3fd","TratoTripulante":"PLINIO","Apresentacao":"21:30","Almoco1":"03:00","Fim1":"04:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"07:56","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"5129023c-2add-4476-acb1-71efb29da3fd","Ativo":true,"Atualizacao":"2023-05-25T15:10:01","Sincronizacao":"2023-02-12T19:43:00","CodigoANAC":687061,"Trato":"PLINIO","Email":"plinio.junior@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"PLINIO Vicentin Junior","UltimoPeso":197.1,"UltimoPesoDeBagagem":0,"Nascimento":"1966-11-03T00:00:00","Identidade":"","CPF":"588.917.069-49","Licenca":"PLH 02322","Endereco":"","Idioma":"ENGLISH LEVEL 4","Admissao":"2022-06-20T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110986","Hash":null,"CodigoPetrobras":"48827380","Justificativa":null,"Bolinha":null,"MatriculaInterna":"110986","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":56,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":89.4,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-06T00:30:00.000Z","Almoco1":"2023-06-05T06:00:00.000Z","Fim1":"2023-06-05T07:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T10:56:00.000Z"}},{"IdEscalaRealizada":"fb98a355-c90d-4ef3-9ee8-c8ebeccfbdc9","IdTripulantes":"d9e250e4-4a95-4865-84cb-7b4624d45a3c","TratoTripulante":"JOAO VITOR","Apresentacao":"21:30","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"08:30","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":false,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"d9e250e4-4a95-4865-84cb-7b4624d45a3c","Ativo":true,"Atualizacao":"2023-05-25T14:58:24","Sincronizacao":"2023-02-09T10:27:30","CodigoANAC":189918,"Trato":"JOAO VITOR","Email":"joao.pinheiro@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"JOAO VITOR Marcelino Pinheiro","UltimoPeso":209,"UltimoPesoDeBagagem":0,"Nascimento":"1993-07-13T00:00:00","Identidade":"","CPF":"134.181.897-76","Licenca":"PCH 06739","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6 ","Admissao":"2022-07-18T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"2 Qz","Matricula":"111008","Hash":null,"CodigoPetrobras":"70935935","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2612","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":30,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":94.8,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-06T00:30:00.000Z","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T11:30:00.000Z"}},{"IdEscalaRealizada":"4f4dbfc8-c20c-4605-b5af-89a181b21512","IdTripulantes":"30ce7d82-e078-11e7-a923-0026b94bb39e","TratoTripulante":"CARAJA","Apresentacao":"06:00","Almoco1":"11:00","Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"15:15","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce7d82-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T15:19:46","Sincronizacao":"2022-11-25T22:53:16","CodigoANAC":820266,"Trato":"CARAJA","Email":"caraja.metzker@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"CARAJA Nazario Metzker","UltimoPeso":201.9,"UltimoPesoDeBagagem":0,"Nascimento":"1969-01-27T00:00:00","Identidade":"","CPF":"656.472.119-68","Licenca":"PLAH 00812","Endereco":"","Idioma":"ENGLISH LEVEL 4 ","Admissao":"1999-10-22T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110241","Hash":null,"CodigoPetrobras":"40146289","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"110241","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.GP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"226c5a9d-a392-4137-8c8d-1d71ea435218","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":54,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.GP","UltimoPesoKG":91.6,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:00:00.000Z","Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T18:15:00.000Z"}},{"IdEscalaRealizada":"e89ef296-d877-4661-b4b8-ae67a29409bf","IdTripulantes":"6ae82ace-e48c-4b1f-9996-afd963887361","TratoTripulante":"ALCANTARA","Apresentacao":"06:00","Almoco1":"11:00","Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"17:00","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"6ae82ace-e48c-4b1f-9996-afd963887361","Ativo":true,"Atualizacao":"2023-06-05T09:58:01","Sincronizacao":"2023-05-08T17:11:40","CodigoANAC":117931,"Trato":"ALCANTARA","Email":"alexandre.miranda@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Alexandre Pires de ALCANTARA Miranda","UltimoPeso":198.4,"UltimoPesoDeBagagem":0,"Nascimento":"1972-05-28T00:00:00","Identidade":"969429666","CPF":"951.332.247-53","Licenca":"PLAH 02319","Endereco":"RUA DO PAU FERRO, 755","Idioma":"PORTUGUÊS NÍVEL 6 ","Admissao":"2023-02-16T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111991","Hash":null,"CodigoPetrobras":"41920908","Justificativa":null,"Bolinha":"amarela","MatriculaInterna":null,"ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":51,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":90,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:00:00.000Z","Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T20:00:00.000Z"}},{"IdEscalaRealizada":"61623aeb-7a5c-468b-8f4e-bbe137ff56db","IdTripulantes":"30ce8868-e078-11e7-a923-0026b94bb39e","TratoTripulante":"JOHN","Apresentacao":"10:00","Almoco1":"12:00","Fim1":"13:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"17:00","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce8868-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T14:59:04","Sincronizacao":"2022-11-25T22:56:30","CodigoANAC":623553,"Trato":"JOHN","Email":"john.johannesson@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"JOHN Roberto Saraiva Johannesson","UltimoPeso":209,"UltimoPesoDeBagagem":0,"Nascimento":"1967-03-08T00:00:00","Identidade":"425253","CPF":"902.092.907-06","Licenca":"PLAH 00326","Endereco":"Rua Alfredo Baltazar da Silveira, 289 Recreio dos Bandeirantes - RJ","Idioma":"PORTUGUÊS NÍVEL 6","Admissao":"1988-01-08T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110296","Hash":null,"CodigoPetrobras":"41091769","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"735","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.GP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"226c5a9d-a392-4137-8c8d-1d71ea435218","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":56,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.GP","UltimoPesoKG":94.8,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T13:00:00.000Z","Almoco1":"2023-06-05T15:00:00.000Z","Fim1":"2023-06-05T16:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T20:00:00.000Z"}},{"IdEscalaRealizada":"83266f50-5e93-422a-a228-d7306c387dc5","IdTripulantes":"384339dc-b91d-4212-bb51-574c733a891b","TratoTripulante":"STOCK","Apresentacao":"10:00","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"21:30","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":false,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"384339dc-b91d-4212-bb51-574c733a891b","Ativo":true,"Atualizacao":"2023-05-25T15:13:00","Sincronizacao":"2022-11-25T23:00:26","CodigoANAC":131036,"Trato":"STOCK","Email":"flavio.stock@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Flavio STOCK","UltimoPeso":175.9,"UltimoPesoDeBagagem":0,"Nascimento":"1970-04-03T00:00:00","Identidade":"","CPF":"001.333.797-10","Licenca":"PLAH 02210","Endereco":"","Idioma":"ENGLISH LEVEL 4","Admissao":"1901-01-01T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110375","Hash":null,"CodigoPetrobras":"46779080","Justificativa":null,"Bolinha":"amarela","MatriculaInterna":"2515","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":53,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":79.8,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T13:00:00.000Z","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-06T00:30:00.000Z"}},{"IdEscalaRealizada":"6d1e362c-2733-4aac-afca-3b475a770ce5","IdTripulantes":"30ce80de-e078-11e7-a923-0026b94bb39e","TratoTripulante":"FILIZZOLA","Apresentacao":"06:00","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"18:00","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":false,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce80de-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T14:51:08","Sincronizacao":"2022-11-25T22:55:18","CodigoANAC":726729,"Trato":"FILIZZOLA","Email":"renato.filizzola@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Renato Garibaldi Delambert FILIZZOLA","UltimoPeso":240.1,"UltimoPesoDeBagagem":0,"Nascimento":"1956-07-19T00:00:00","Identidade":"","CPF":"759.015.287-00","Licenca":"PLAH 01210","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6","Admissao":"1997-01-15T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110353","Hash":null,"CodigoPetrobras":"40146228","Justificativa":null,"Bolinha":"amarela","MatriculaInterna":"110353","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":67,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":108.9,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":null,"Fim1":null,"Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T21:00:00.000Z"}},{"IdEscalaRealizada":"a7196028-85c3-4a95-a8d1-2f10ecdb596b","IdTripulantes":"822309f0-a312-49b5-bc5a-a78af582537c","TratoTripulante":"IAN","Apresentacao":"06:00","Almoco1":"11:00","Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"16:45","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"822309f0-a312-49b5-bc5a-a78af582537c","Ativo":true,"Atualizacao":"2023-05-25T14:57:12","Sincronizacao":"2023-02-12T19:41:34","CodigoANAC":110082,"Trato":"IAN","Email":"ian.ramos@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"IAN Rosenburg Ramos","UltimoPeso":190.9,"UltimoPesoDeBagagem":0,"Nascimento":"2022-12-28T00:00:00","Identidade":"","CPF":"094.395.057-02","Licenca":"PLAH 02631","Endereco":"","Idioma":"ENGLISH LEVEL 5 ","Admissao":"2022-07-21T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111010","Hash":null,"CodigoPetrobras":"48104397","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2615","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":0,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":86.6,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:00:00.000Z","Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T19:45:00.000Z"}},{"IdEscalaRealizada":"e1ce72b3-6932-47c7-bd7e-587156aaa342","IdTripulantes":"08acdf0e-acb6-48e3-875d-b05890b9028b","TratoTripulante":"PIERRE","Apresentacao":"06:00","Almoco1":"11:00","Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"17:00","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"08acdf0e-acb6-48e3-875d-b05890b9028b","Ativo":true,"Atualizacao":"2023-05-25T15:09:38","Sincronizacao":"2023-03-09T15:31:40","CodigoANAC":102726,"Trato":"PIERRE","Email":"pierre.ramos@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"PIERRE Verardi Ramos","UltimoPeso":176.4,"UltimoPesoDeBagagem":0,"Nascimento":"1969-07-01T00:00:00","Identidade":"","CPF":"655.852.754-53","Licenca":"PLAH 01772","Endereco":"RAMAL DOS PROMOTORES, Nº 1186 - UNIVERSIDADE - Macapá - 68903491","Idioma":"ENGLISH LEVEL 4","Admissao":"2022-12-01T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111821","Hash":null,"CodigoPetrobras":"41768513","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2633","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":54,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":80,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:00:00.000Z","Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T20:00:00.000Z"}},{"IdEscalaRealizada":"b2813940-97f0-429d-9a35-ffa2790ac2ae","IdTripulantes":"a2237e39-df8c-4283-950c-e290fb79f21e","TratoTripulante":"OCTAVIO","Apresentacao":"06:00","Almoco1":"11:00","Fim1":"12:00","Almoco2":null,"Fim2":null,"FinalDaJornada":"17:30","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"a2237e39-df8c-4283-950c-e290fb79f21e","Ativo":true,"Atualizacao":"2023-05-25T15:07:51","Sincronizacao":"2023-02-12T19:43:34","CodigoANAC":147967,"Trato":"OCTAVIO","Email":"octavio.correa@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"OCTAVIO Augusto dos Santos Correa","UltimoPeso":231.5,"UltimoPesoDeBagagem":0,"Nascimento":"1979-04-07T00:00:00","Identidade":"","CPF":"083.074.937-30","Licenca":"PCH 05285","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6","Admissao":"2021-12-17T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110715","Hash":null,"CodigoPetrobras":"70616101","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2579","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":44,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":105,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T14:00:00.000Z","Fim1":"2023-06-05T15:00:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T20:30:00.000Z"}},{"IdEscalaRealizada":"3746d9f4-282e-44c5-af58-c8b5a9df366d","IdTripulantes":"cd724b29-fd4d-4fa5-b5ee-e059cae1a8a5","TratoTripulante":"VERONESI","Apresentacao":"21:30","Almoco1":"03:30","Fim1":"04:30","Almoco2":null,"Fim2":null,"FinalDaJornada":"08:26","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"cd724b29-fd4d-4fa5-b5ee-e059cae1a8a5","Ativo":true,"Atualizacao":"2023-05-25T15:14:12","Sincronizacao":"2022-11-25T23:00:43","CodigoANAC":845289,"Trato":"VERONESI","Email":"IVAN.JUNIOR@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Ivan VERONESI de Jesus Junior","UltimoPeso":151.9,"UltimoPesoDeBagagem":0,"Nascimento":"1968-04-16T00:00:00","Identidade":"","CPF":"857.454.217-20","Licenca":"PLAH 00510","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6","Admissao":"1901-01-01T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110473","Hash":null,"CodigoPetrobras":"44392930","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"2540","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":55,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":68.9,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-06T00:30:00.000Z","Almoco1":"2023-06-05T06:30:00.000Z","Fim1":"2023-06-05T07:30:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T11:26:00.000Z"}},{"IdEscalaRealizada":"82059175-27a7-4185-ab7a-838413c4459c","IdTripulantes":"8879e1a1-9c51-4a54-8113-11d8493f02bd","TratoTripulante":"LOBO","Apresentacao":"21:30","Almoco1":"03:30","Fim1":"04:30","Almoco2":null,"Fim2":null,"FinalDaJornada":"08:26","Voos":[],"CompararVoos":[],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"8879e1a1-9c51-4a54-8113-11d8493f02bd","Ativo":true,"Atualizacao":"2023-05-25T15:02:24","Sincronizacao":"2023-02-12T17:32:17","CodigoANAC":106935,"Trato":"LOBO","Email":"rodolfo.costa@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"Rodolfo LOBO da Costa","UltimoPeso":171.1,"UltimoPesoDeBagagem":0,"Nascimento":"1966-03-17T00:00:00","Identidade":"","CPF":"451.666.410-00","Licenca":"PLH 02259","Endereco":"","Idioma":"PORTUGUÊS NÍVEL 6 ","Admissao":"2022-07-06T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"111002","Hash":null,"CodigoPetrobras":"49225734","Justificativa":null,"Bolinha":null,"MatriculaInterna":"2610","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":57,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":77.6,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-06T00:30:00.000Z","Almoco1":"2023-06-05T06:30:00.000Z","Fim1":"2023-06-05T07:30:00.000Z","Almoco2":null,"Fim2":null,"FinalDaJornada":"2023-06-05T11:26:00.000Z"}},{"IdEscalaRealizada":"3209f7d2-0a98-468a-89ac-3e264fdc2f8e","IdTripulantes":"30ce8fb6-e078-11e7-a923-0026b94bb39e","TratoTripulante":"GIOVANNI","Apresentacao":"06:00","Almoco1":"09:15","Fim1":"09:45","Almoco2":"13:00","Fim2":"14:00","FinalDaJornada":"17:00","Voos":["(06:45-07:56)","(07:56-09:08)","(10:06-11:19)","(11:19-12:33)"],"CompararVoos":[{"Partida":"2023-06-05T06:45:00","Corte":"2023-06-05T07:56:00"},{"Partida":"2023-06-05T07:56:00","Corte":"2023-06-05T09:08:00"},{"Partida":"2023-06-05T10:06:00","Corte":"2023-06-05T11:19:00"},{"Partida":"2023-06-05T11:19:00","Corte":"2023-06-05T12:33:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"30ce8fb6-e078-11e7-a923-0026b94bb39e","Ativo":true,"Atualizacao":"2023-05-25T14:54:39","Sincronizacao":"2022-11-25T22:55:52","CodigoANAC":104146,"Trato":"GIOVANNI","Email":"giovanni.fucetola@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"GIOVANNI de Mattos Fucetola","UltimoPeso":171.5,"UltimoPesoDeBagagem":0,"Nascimento":"1975-08-13T00:00:00","Identidade":"048543839","CPF":"029.485.747-81","Licenca":"PLAH 01881","Endereco":"Rua Bom Pastor, 107 Tijuca - RJ","Idioma":"ENGLISH LEVEL 4 ","Admissao":"2017-06-26T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"110282","Hash":null,"CodigoPetrobras":"41638116","Justificativa":null,"Bolinha":"verde","MatriculaInterna":"2419","ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"Cmt.MP","EhCMT":true,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"44287b0a-8c0f-47f4-8c18-4cffe944b00a","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":48,"Operacao":[],"OperacaoStr":"","CargoStr":"Cmt.MP","UltimoPesoKG":77.8,"Sexo":null,"EhCMT":true,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T12:15:00.000Z","Fim1":"2023-06-05T12:45:00.000Z","Almoco2":"2023-06-05T16:00:00.000Z","Fim2":"2023-06-05T17:00:00.000Z","FinalDaJornada":"2023-06-05T20:00:00.000Z"}},{"IdEscalaRealizada":"bc482d83-d726-4fcd-a978-8e6e5773a546","IdTripulantes":"63de0c32-06b4-40c8-9aea-19543fd419af","TratoTripulante":"THIAGO","Apresentacao":"06:00","Almoco1":"09:45","Fim1":"10:15","Almoco2":"13:00","Fim2":"14:00","FinalDaJornada":"16:30","Voos":["(06:45-07:56)","(07:56-09:08)","(10:06-11:19)","(11:19-12:33)"],"CompararVoos":[{"Partida":"2023-06-05T06:45:00","Corte":"2023-06-05T07:56:00"},{"Partida":"2023-06-05T07:56:00","Corte":"2023-06-05T09:08:00"},{"Partida":"2023-06-05T10:06:00","Corte":"2023-06-05T11:19:00"},{"Partida":"2023-06-05T11:19:00","Corte":"2023-06-05T12:33:00"}],"PossuiEscalaRealizada":true,"Data":"2023-06-05T00:00:00","DomingoOuFeriado":false,"Tripulante":{"Id":"63de0c32-06b4-40c8-9aea-19543fd419af","Ativo":true,"Atualizacao":"2023-06-01T15:03:35","Sincronizacao":"2023-05-23T16:04:07","CodigoANAC":135190,"Trato":"THIAGO","Email":"thiago.medeiros@bristowgroup.com","IdentificadorCivil":null,"NomeCompleto":"THIAGO Cavalcanti de Medeiros","UltimoPeso":224,"UltimoPesoDeBagagem":0,"Nascimento":"1982-07-24T00:00:00","Identidade":"304693212","CPF":"217.495.538-56","Licenca":"PLAH 02740","Endereco":"RUA SANTA, 95 VILA MASCOTE, SP","Idioma":"ENGLISH LEVEL 4","Admissao":"2023-03-08T00:00:00","Desligamento":null,"IdentificadorCliente":null,"SalvoOnline":true,"CTPS":null,"Quinzena":"1 Qz","Matricula":"112043","Hash":null,"CodigoPetrobras":"71350802","Justificativa":null,"Bolinha":null,"MatriculaInterna":null,"ComandanteEm":null,"InstrutorEm":null,"Trigrama":null,"UltimoVoo":"0001-01-01T00:00:00","SoVoaComInstrutor":false,"Cargo":{"Nome":"1º Of.","EhCMT":false,"EhInstrutor":false,"Ativo":true,"Atualizacao":"2019-10-13T17:17:34","Sincronizacao":"2019-10-13T17:17:27","Id":"8ee341dc-7b98-4b71-a26c-da11ebe3a56b","Novo":false,"Modificado":false,"AtualizadoPor":null},"Base":{"Nome":"JACAREPAGUÁ","ICAO":"SBJR","Ativo":true,"Atualizacao":"2019-02-13T15:25:46","Sincronizacao":"2019-02-13T15:25:46","Id":"a71e6a53-03c8-4537-a40b-716514ec81b9","Novo":false,"Modificado":false,"AtualizadoPor":null},"Idade":41,"Operacao":[],"OperacaoStr":"","CargoStr":"1º Of.","UltimoPesoKG":101.6,"Sexo":null,"EhCMT":false,"EhInstrutor":false,"Regulamentacao":null,"Novo":false,"Modificado":false,"AtualizadoPor":null},"valido":true,"EscalaRealizada":{"Apresentacao":"2023-06-05T09:00:00.000Z","Almoco1":"2023-06-05T12:45:00.000Z","Fim1":"2023-06-05T13:15:00.000Z","Almoco2":"2023-06-05T16:00:00.000Z","Fim2":"2023-06-05T17:00:00.000Z","FinalDaJornada":"2023-06-05T19:30:00.000Z"}}]`;
    this.dados = this.organizarDados(JSON.parse(dados));

    this.carregando = false;
  }

}
