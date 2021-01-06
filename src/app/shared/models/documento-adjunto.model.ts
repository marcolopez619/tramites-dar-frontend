export interface DocumentoAdjuntoModel{
  id?: number;
  nombre?: string;
  bucketName?: string;
  pathDestinoOnServer?: string;
  tipo?: string;
  fechaSubida?: unknown;
  informacion?: File;
  usuarioBitacora?: string;
  porcentajeUploaded?: number;
}


export interface DataDocumentoAdjunto{
  startSaveDocuments?: boolean;
  datosAdicionales?: any;
}
