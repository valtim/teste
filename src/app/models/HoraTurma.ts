import { GuidUtil } from "../shared/GuidUtil";

export class HoraTurma 
{
    constructor(dados = null){
        if ( dados == null )
        {
            this.Id = GuidUtil.NewGuid();
            return;
        }
        this.Data = dados.Data;
        this.HoraInicio = dados.HoraInicio;
        this.HoraTermino = dados.HoraTermino;
        this.Descricao = dados.Descricao;
        this.ParaPagamento = dados.ParaPagamento;
        this.OitoHoras = dados.OitoHoras;
            
    }

    public Id : string;
    public Data : string;
    public HoraInicio : string;
    public HoraTermino : string;
    public Descricao : string;
    public ParaPagamento : boolean;
    public OitoHoras : boolean;

}