import { PerfisHabilitados } from "./PerfisHabilitados";

export class PermissoesDeAcessoById {
  public Username: String;
  public UsernameAlt: String;
  public Hash: String;
  public Senha: String;
  public Email: String;
  public ConfiguracoesDoUsuario: any[];
  public PerfisHabilitados: PerfisHabilitados[];
  public Ativo: boolean;
  public Atualizacao: Date;
  public Sincronizacao: Date;
  public Id: String;
  public AtualizadoPor: String;
}
