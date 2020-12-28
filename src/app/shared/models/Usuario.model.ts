export interface UsuarioModel {
/*   nombreCompleto?: string;
  cargo?: string;
  guid?: string;
  email?: string;
  samActName?: string;
  distinguishedName?: string; */

  idPersonaGd?: number;
  idEntidad?: number;
  idUnidadOrg?: number;
  nombres?: string;
  apellidos?: string;
  nombreCompleto?: string;
  cargo?: string;
  tipoUsuario?: string;
  entNombre?: string;
  entSigla?: string;
  uogNombre?: string;
  uogDescripcion?: string;
  uogSigla?: string;
  codigoRespuesta?: number;
  mensaje?: string;
}
