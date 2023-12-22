export class Tripulante {
    

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Id = dados.Id;
        this.Trato = dados.Trato;
        this.Licenca = dados.Licenca;
        // this.Cargo = dados.Cargo;
        this.CodigoANAC = dados.CodigoANAC;
        this.Vencimentos = dados.Vencimentos;
        this.Cargo = dados.Cargo;
    }

    Id: string;
    Trato: string;
    Licenca: string;
    // Cargo: string;
    CodigoANAC: string;
    Cargo: any;
    Vencimentos: [];
}
