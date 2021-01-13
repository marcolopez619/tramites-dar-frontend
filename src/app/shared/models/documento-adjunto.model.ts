export interface DocumentoAdjuntoModel {
  id?: number;
  nombre?: string;
  bucketName?: string;
  pathDestinoOnServer?: string;
  descripcion?: string;
  tipo?: string;
  fechaSubida?: unknown;
  informacion?: File;
  usuarioBitacora?: string;
  porcentajeUploaded?: number;
  isCiteOrHR?: number;
}

export interface DocumentoAdjuntoDownloadParam {
  bucketName?: string;
  nombreArchivoDownload?: string;
  NivelBucketName?: string;
}

export interface DataDocumentoAdjunto {
  startSaveDocuments?: boolean;
  datosAdicionales?: any;
}
