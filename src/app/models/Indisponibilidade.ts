export interface Indisponibilidade {
    Id: String;
    Contrato: any;
    Inicio: Date;
    Fim: Date;
    DescricaoDoMotivo: string;
    Ocorrencias : any;
        //public virtual IList<OcorrenciaIndisponibilidade> Ocorrencias { get; set; }
}