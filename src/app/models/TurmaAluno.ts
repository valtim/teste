import { Turma } from "./Turma";


export class TurmaAluno
{
    constructor(){
    }

    public Id : string = "";
    public Nota : number;
    public Confirmado : boolean = true;
    public Avaliado : boolean;
    public Notificado : boolean;
    public Aluno : any;

}