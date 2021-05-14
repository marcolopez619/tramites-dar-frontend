export interface Perfil {
  idPerfil?: number;
  nombrePerfil?: string;
}
export interface UsuarioInsert {
  idPerfil?: number;
  nombre?: string;
  password?: string;
  celular?: string;
  estado?: number;
}

export interface UsuarioUpdate extends UsuarioInsert {
  idUsuario?: number;
}
