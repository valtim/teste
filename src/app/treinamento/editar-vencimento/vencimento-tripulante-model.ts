import { Tripulante } from "src/app/escala/dupla-adm/tripulante-model";
import { Vencimento } from "./vencimento-model";

export class VencimentoTripulante {

    constructor(dados: any = null) {
        if (dados == null)
            return;
        this.Tripulante = new Tripulante(dados.Tripulante);
        this.Vencimentos = dados.Vencimentos.map(x=> new Vencimento(x));
    }

    Tripulante : Tripulante;
    Vencimentos : Vencimento[];
}
