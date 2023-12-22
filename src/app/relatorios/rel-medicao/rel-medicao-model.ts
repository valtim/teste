// public ContratoMedicao()

import { DataUtil } from "src/app/shared/DataUtil";
import { TimeSpan } from "src/app/shared/time-span-model";
import { DiaMedicao } from "./dia-medicao-model";

export class RelMedicao {

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Dias = dados.Dias.map(x=> new DiaMedicao(x));
        this.Prefixo = dados.Prefixo;
        this.Contrato = dados.Contrato;
        this.Base = dados.Base;
        this.Inicio = dados.Inicio;
        this.Fim = dados.Fim;
        // this.TotalTempoFB = dados.TotalTempoFB;
        // this.TotalBackUp = dados.TotalBackUp;
        this.TotalConsumoFB = dados.TotalConsumoFB;
        // this.TotalDowtime = dados.TotalDowtime;
        // this.TotalTempoGlosado = dados.TotalTempoGlosado;     
        // this.TempoTotalFaturado = dados.TempoTotalFaturado; 
        this.PrefixoCompleto = dados.PrefixoCompleto;  
    }
    Dias : DiaMedicao[];
    Prefixo : string;
    Contrato: string;
    Base: string;
    Inicio: string;
    Fim: string;
    TotalConsumoFB: string;
    PrefixoCompleto : string;

    get TotalDowtime(): TimeSpan{
        return this.Dias.map(x => x.IndisponibilidadeDiaria).reduce((total, x) => total.SomaHoras(x));
    }
    get TotalTempoGlosado(): TimeSpan{
        let dias = this.Dias.map(x => x.TempoGlosada);
        if ( dias.length == 0 ) 
            return new TimeSpan();
        return dias.reduce((total, x) => total.SomaHoras(x));
    }
    get TempoTotalFaturado(): TimeSpan{
        let dias = this.Dias.map(x => x.TempoFaturado);
        if ( dias.length == 0 ) 
            return new TimeSpan();
        return dias.reduce((total, x) => total.SomaHoras(x));
    }
    get TotalTempoFB(): TimeSpan{
        let dias = this.Dias.map(x => x.Tempo);
        if ( dias.length == 0 ) 
            return new TimeSpan();
        return dias.reduce((total, x) => total.SomaHoras(x));
    }
    get TotalBackUp(): TimeSpan{
        let dias = this.Dias.filter(x=>x.Backup != '').map(x => x.TempoFaturado);
        if ( dias.length == 0 ) 
            return new TimeSpan();
        return dias.reduce((total, x) => total.SomaHoras(x));
    }
}
