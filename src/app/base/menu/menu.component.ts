import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/base.component';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';

/**
 * Componente para mostrar el menu del sistema.
 *
 * @export
 * @class MenuComponent
 * @extends {BaseComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'base-menu',
    templateUrl: 'menu.component.html',
    // animations: [zoomInAnim, fadeInLeftAnim, breadListAnim],
    host: {class: 'container-fluid'}
})
export class MenuComponent extends BaseComponent implements OnInit {

  openSideNav = true;

  listaCompleta = ['MARCO ANTONIO MOLINA LOPEZ', 'SARDINA CONDORI MALPARTIDA', 'MAMANI MAMANILLO JUAN', 'HUNCARIO LUIS', 'ZAPATA CONDORI ALBERTO'];

    /**
     * Creates an instance of MenuComponent.
     * @param {ContextoService} contextoService
     * @param {LangService} langService
     * @param {Router} router
     * @memberof MenuComponent
     */
    constructor(
        public contextoService: ContextoService,
        public langService: LangService,
        private router: Router
    ) { super(); }

    /**
     * Hook on init del componente.
     *
     * @memberof MenuComponent
     */
    ngOnInit(): void {
        /* if (this.contextoService.breadCrumbs.length === 0) {
            this.contextoService.listaMenu = this.contextoService.getListaSchemas();
            if (this.contextoService.listaMenu.length === 0) {
              this.router.navigate(['/login']);
            }
        } */
    }

    gotoAnotherPage(): void {
      this.router.navigate(['cites/index']);
    }

    getListaSeleccionada($event): void {
      console.log('----------------------');

      $event.forEach(element => {
        console.log( '---> ' + element );
      });
    }
}
