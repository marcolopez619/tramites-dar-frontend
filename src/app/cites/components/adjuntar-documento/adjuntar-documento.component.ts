import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { DataDocumentoAdjunto, DataDocumentoAdjuntoResultFromSave } from '../../../shared/models/documento-adjunto.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { DocumentoAdjuntoService } from '../../../shared/services/documento-adjunto.service';
import { LangService } from '../../../shared/services/lang.service';
import { CiteModelByUsuario } from '../../models/cites.models';

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-documento.component.html',
  styleUrls: ['./adjuntar-documento.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AdjuntarDocumentoComponent  extends BaseComponent implements OnInit {

  isValid: boolean;
  isFileUploadedCompleted: boolean;
  citeSelected: CiteModelByUsuario;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) { super(); }

  ngOnInit(): void {
    this.citeSelected = this.data.citeSelected as CiteModelByUsuario;
    console.log( `Cite recuperado : ${this.citeSelected.idCite}` );

    const data: DataDocumentoAdjunto = {
      startSaveDocuments : false,
      datosAdicionales : this.citeSelected
    };
    this.documentoAdjuntoService.sendFlagToSaveDocument( data );

  }

  onSaveDocAdjuntos(): void {
    const data: DataDocumentoAdjunto = {
      startSaveDocuments : true,
      datosAdicionales : this.citeSelected
    };
    this.documentoAdjuntoService.sendFlagToSaveDocument( data );
  }

  verifyDocsAdjuntos(isValidDocAdj: boolean): void {
    this.isValid = isValidDocAdj;
  }

  isUploadesAllFiles(dataUploaded: DataDocumentoAdjuntoResultFromSave): void {

    if ( dataUploaded.isAllFilesUploaded ) {
      this.onClose( true );
    }
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
