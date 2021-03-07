import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { FinalizarParticipacionQueryParameter } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { eModulo } from '../../../shared/enums/modulo.enum';
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
    public langService: LangService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onImprimirFormulario(): void {
    const title = this.langService.getLang(eModulo.Base, 'lbl-confirmacion' );
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
      });

  }

}
