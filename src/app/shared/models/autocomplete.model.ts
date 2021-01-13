import { UsuarioModel } from './Usuario.model';

export interface AutocompleteData {
  listaSeleccionados?: Array<UsuarioModel>;
  itemEliminado?: UsuarioModel;
}
