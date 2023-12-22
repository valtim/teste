import { Tripulante } from "src/app/escala/dupla-adm/tripulante-model";
import { Certificado } from "./certificado-model";
import { OcorrenciaDb } from "./ocorrencia-db-model";

export class Vencimento {

    constructor(dados: any = null) {
        if (dados == null)
            return;

        if (typeof (dados) == 'string') {
            this.Tripulante = new Tripulante({ Trato: dados })
            this.EhNome = true;
            return;
        }

        if (dados.UltimosVoos != undefined) {

        }



        this.Tripulante = new Tripulante(dados.Tripulante);
        this.Certificado = new Certificado(dados.Certificado);



        if (this.Certificado.ReadOnly) {
            console.log(this.Certificado.Nome);
        }

        this.Id = dados.Id;
        if (dados.DataDeVencimento != undefined) this.DataDeVencimento = new Date(dados.DataDeVencimento);
        if (dados.DataDeRealizacao != undefined) this.DataDeRealizacao = new Date(dados.DataDeRealizacao);
        this.NaoControlado = dados.NaoControlado;
        if (dados.UltimosVoos != undefined) this.UltimosVoos = dados.UltimosVoos.map(x => new OcorrenciaDb(x));

    }

    Id: string;
    DataDeRealizacao: Date;
    DataDeVencimento: Date;
    NaoControlado: boolean;
    Tripulante: Tripulante;
    Certificado: Certificado;
    Display: boolean = false;
    EhNome = false;
    UltimosVoos: OcorrenciaDb[];


    set VencimentoCalculado(value) {

    }

    CalcularVencimento() : Date {


        var data = new Date(this.DataDeRealizacao.getFullYear(), this.DataDeRealizacao.getMonth(), this.DataDeRealizacao.getDate());

        if (this.Certificado.ValidadeEmDias == undefined && this.Certificado.ValidadeEmMeses == undefined)
            return data;

        if (this.Certificado.ValidadeEmDias > 0)
            data.setDate(this.DataDeRealizacao.getDate() + this.Certificado.ValidadeEmDias);

        if (this.Certificado.ValidadeEmMeses > 0)
            data.setMonth(this.DataDeRealizacao.getMonth() + this.Certificado.ValidadeEmMeses);

        if (this.Certificado.SomenteMes) {
            // data.setMonth(data.getMonth() + 1);
            data = new Date(data.getFullYear(), data.getMonth() + 1, 0)
        }

        return data;
    }

    get ValorExibido() {

        if (this.EhNome)
            return this.Tripulante.Trato;

        if (this.DataDeVencimento == undefined)
            return "---";

        if (!this.Certificado.SomenteMes)
            return this.DataDeVencimento.toLocaleDateString();

        var mes = (this.DataDeVencimento.getMonth() + 1).toString().padStart(2, '0');
        var ano = this.DataDeVencimento.getFullYear().toString().padStart(4, '0');

        return mes + '/' + ano;
    }
    get CorNaTela(): string {

        var cor = "";

        if (this.NaoControlado || this.DataDeVencimento == undefined)
            return cor;

        var difference = this.DataDeVencimento.getTime() - new Date().getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));

        if (days < 60)
            cor = "azul";

        if (days < 30)
            cor = "amarelo";

        if (days < 15)
            cor = "laranja";

        if (days < 0)
            cor = "vermelho";

        return cor;

    }
}
