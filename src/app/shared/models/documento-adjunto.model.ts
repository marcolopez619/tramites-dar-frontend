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

export interface DataDocumentoAdjuntoResultFromSave {
  isAllFilesUploaded?: boolean;
}

export interface ListaDocumentosAdjuntos {
  idDerivacion?: number;
  nombreArchivo?: string;
  tipoArchivo?: string;
  nivelBucket?: string;
  referencia?: string;
  pathArchivo?: string;
  fechaRegistro?: Date;
  idCite?: number;
  cite?: string;
}
