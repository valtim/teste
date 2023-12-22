
export class Certificado {

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Id = dados.Id;
        this.Nome = dados.Nome;
        this.SomenteMes = dados.SomenteMes;
        this.ReadOnly = dados.ReadOnly;
        this.ValidadeEmDias = dados.ValidadeEmDias;
        this.ValidadeEmMeses = dados.ValidadeEmMeses;       
    }

    Id: string;
    Nome: string;
    SomenteMes : boolean;
    ReadOnly : boolean;
    ValidadeEmDias : number;
    ValidadeEmMeses : number;
}
