export interface DocumentoAdjuntoModel{
  id?: number;
  nombre?: string;
  bucketName?: string;
  pathDestinoOnServer?: string;
  tipo?: string;
  fechaSubida?: unknown;
  informacion?: File;
  usuarioBitacora?: string;
}


export interface DataDocumentoAdjunto{
  startSaveDocuments?: boolean;
  datosAdicionales?: any;
}
