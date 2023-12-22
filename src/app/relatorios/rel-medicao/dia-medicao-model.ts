import { DataUtil } from "src/app/shared/DataUtil";
import { TimeSpan } from "src/app/shared/time-span-model";

export class DiaMedicao {

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Id = dados.Id;
        this.Data = dados.Data;
        this.FolhaDeBordo = dados.FolhaDeBordo;
        this.Base = dados.Base;
        this.CombustivelConsumido = dados.CombustivelConsumido;
        this.CombustivelAbastecido = dados.CombustivelAbastecido;
        this.Backup = dados.Backup;
        this.Observacao = dados.Observacao;
        this.Periodo = dados.Periodo;
        this.PodeGlosa = dados.PodeGlosa;   
        this.Tempo = new TimeSpan(dados.Tempo);
        this.TempoGlosada = new TimeSpan(dados.TempoGlosada);
        this.IndisponibilidadeDiaria = new TimeSpan(dados.IndisponibilidadeDiaria);     
    }

    Id : string;
    Data: string;
    FolhaDeBordo: string;
    Backup: string = '';
    Base: string;
    CombustivelConsumido: string;
    CombustivelAbastecido: string;
    PodeGlosa : boolean;
    Tempo: TimeSpan;
    TempoGlosada: TimeSpan;
    get TempoFaturado() :TimeSpan {
        return this.Tempo.DiferencaHoras(this.TempoGlosada);// DataUtil.diferencaHoras(this.Tempo, this.TempoGlosada);
    }
    Observacao: string;
    Periodo: string;
    IndisponibilidadeDiaria: TimeSpan;
}
