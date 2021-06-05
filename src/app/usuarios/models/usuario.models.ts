export interface Perfil {
  idPerfil?: number;
  nombrePerfil?: string;
}
export interface UsuarioInsert {
  paterno?: string;
  materno?: string;
  nombres?: string;
  idPerfil?: number;
  idEstudiante?: number;
  idCarrera?: number;
  nickName?: string;
  password?: string;
  celular?: string;
  estado?: number;
}

export interface UsuarioUpdate extends UsuarioInsert {
  idUsuario?: number;
}


export interface CarreraModel{
  idCarrera?: number;
  nombre?: string;
  estado?: number;
  idFacultad?: number;
}
