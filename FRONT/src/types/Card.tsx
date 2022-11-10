export enum ListaEnum {
  ToDo = "ToDo",
  Doing = "Doing",
  Done = "Done",
}

export enum ModeEnum {
  VIEW = "view",
  EDIT = "edit",
  NEW = "new",
}

export type Card = {
  id?: string;
  titulo?: string;
  conteudo?: string;
  lista?: ListaEnum;
};
