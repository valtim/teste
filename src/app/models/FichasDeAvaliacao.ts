import { ItemFicha } from "./ItemFicha";

export class FichasDeAvaliacao {
  public Nome: String;
  public Itens: Array<ItemFicha>;
  public Id: String;
  public Ativo: boolean;
  public Atualizacao: Date;
}
