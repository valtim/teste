import { Tripulante } from "../escala/dupla-adm/tripulante-model";
import { GuidUtil } from "../shared/GuidUtil";

export class TurmaAluno {
    constructor(dados = null) {
        this.Id = GuidUtil.NewGuid();
        if (dados == null){
            this.Confirmado = false;
            this.Avaliado = false;
            this.Notificado = false;
            return;
        }
        this.Nota = dados.Nota;
        this.Confirmado = dados.Confirmado;
        this.Avaliado = dados.Avaliado;
        this.Notificado = dados.Notificado;
        if (dados.Aluno != null)
            this.Aluno = new Tripulante(dados.Aluno);
    }

    public Id: string = "";
    public Nota: number;
    public Confirmado: boolean = true;
    public Avaliado: boolean;
    public Notificado: boolean;
    public Aluno: any;

}