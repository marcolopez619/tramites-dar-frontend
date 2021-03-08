import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { LangService } from '../../../shared/services/lang.service';

@Component({
  selector: 'app-anulacion',
  templateUrl: './anulacion.component.html',
  styleUrls: ['./anulacion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AnulacionComponent extends BaseComponent  implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onImprimirFormulario(): void {
    this.onClose(true);
    /* const title = this.langService.getLang(eModulo.Base, 'lbl-confirmacion' );
    const content = this.langService.getLang(eModulo.Estudiante, 'msg-impresion-anulacion-carrera' );

    const dlgConfirmImpresion = this.dialog.open( ConfirmDialogComponent , {
      disableClose: false,
      width: '600px',
      data: {
        title  : title,
        content: content,
        icon   : 'contact_support'
      }
    });

    dlgConfirmImpresion.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {

        if (result) {
          console.log( 'IMPRIMIENDOOOOO FORMULARIOOOOOOOOOO DE ANULACIONNNN' );
        }
      }); */

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
