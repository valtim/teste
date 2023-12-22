export class OcorrenciaDb {

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Data = dados.Data;
        this.NumeroDaFolha = dados.NumeroDaFolha;
        this.NumeroDoDiario = dados.NumeroDoDiario;
    }

    Data : Date;
    NumeroDaFolha : string;
    NumeroDoDiario : string;
}
