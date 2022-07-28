import { GruposDePerguntas } from "./GruposDePerguntas";

export class ItemFicha {
  public Texto: String;
  public Ordem: number;
  public Grupo: GruposDePerguntas;
  public Id: String;
  public Ativo: boolean;
  public Atualizacao: Date;
}
