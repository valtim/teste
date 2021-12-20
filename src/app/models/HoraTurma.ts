import { GuidUtil } from "../shared/GuidUtil";

export class HoraTurma 
{
    constructor(){
        this.Id = GuidUtil.NewGuid();
    }

    public Id : string;
    public Data : string;
    public HoraInicio : string;
    public HoraTermino : string;

}