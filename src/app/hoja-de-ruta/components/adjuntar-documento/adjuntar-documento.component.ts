import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { DocumentoAdjuntoService } from '../../../shared/services/documento-adjunto.service';
import { LangService } from '../../../shared/services/lang.service';
import { DataDocumentoAdjunto } from '../../../shared/models/documento-adjunto.model';

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-documento.component.html',
  styleUrls: ['./adjuntar-documento.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AdjuntarDocumentoComponent  extends BaseComponent implements OnInit {

  formAdjuntarDocumento: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) { super(); }

  ngOnInit(): void {
    this.formAdjuntarDocumento = this.formBuilder.group({
      comentario        : [ undefined, [Validators.required, Validators.maxLength(100)]],
      documentosAdjuntos: [ undefined, [Validators.required]]
    });
  }

  onGuardarDocumentoAdjunto(): void {
    const comentario = this.formAdjuntarDocumento.controls[ 'comentario' ].value;

    if ( this.formAdjuntarDocumento.controls[ 'documentosAdjuntos' ].valid ) {
      //Enviar el flag de inicio de subida de documentos al servidor de archivos ( true )
      const data: DataDocumentoAdjunto = {
        startSaveDocuments : true
      };

      this.documentoAdjuntoService.sendFlagToSaveDocument( data );
    }

  }

  isDocumentoAdjuntoValid(isValid: boolean): void{
    console.log( `is required desde adjuntar documento : ${isValid}` );
    this.formAdjuntarDocumento.controls[ 'documentosAdjuntos' ].setValue( isValid ? isValid : undefined );
  }

  onCancelar(): void {
    this.dialogRef.close(undefined);
  }

}
