
export class CurriculoDados {

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Id = dados.Id;
        this.OperadorAereo = dados.OperadorAereo;
        this.Modelo = dados.Modelo;
        this.PeriodoInicio = new Date(dados.PeriodoInicio);
        this.PeriodoFim = new Date(dados.PeriodoFim);
        this.HorasComando = parseFloat(dados.HorasComando);
        this.HorasCopiloto = parseFloat(dados.HorasCopiloto);
        this.Bimotor = dados.Bimotor;
        // this.HorasInstrucao = parseFloat(dados.HorasInstrucao);
        // this.HorasInstrutor = parseFloat(dados.HorasInstrutor);
        // this.HorasInstrucaoParaComando= parseFloat(dados.HorasInstrucaoParaComando);
        // this.GeradoViaSistema = dados.GeradoViaSistema;
        // this.Ordem = parseInt(dados.Ordem);
        
    }

    Id : string;
    OperadorAereo: string;
    PeriodoInicio: Date;
    PeriodoFim: Date;
    Modelo: string;
    HorasComando: number;
    HorasCopiloto: number;
    Bimotor : boolean;
    // HorasInstrucao: number;
    // HorasInstrutor: number;
    // HorasInstrucaoParaComando: number;
    // GeradoViaSistema : boolean;
    // Ordem : number;

    get Total() : string {
        return (this.HorasComando + this.HorasCopiloto).toFixed(1);
    }
}
