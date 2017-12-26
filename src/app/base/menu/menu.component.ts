import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/base.component';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';
import { btnHomeAnimation, btnMenuAnimation } from '../../shared/animations/template.animation';


/** 
 * Componente para mostrar el menu del sistema.
 * 
 * @export
 * @class MenuComponent
 * @extends {BaseComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls:['menu.component.css'],
    animations: [btnHomeAnimation, btnMenuAnimation]
})
export class MenuComponent extends BaseComponent implements OnInit{

    // Lista de items del menu.
    public listaMenu: any[] = []; 

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
    ) { super() }

    /**
     * Evento que sucede cuando se selecciona un item del menu.
     * 
     * @param {*} pMenu Item seleccionado.
     * @memberof MenuComponent
     */
    onMenuSelected(pMenu: any): void {
        
        // Obtiene sus items hijos.
        this.listaMenu = pMenu.RecursosHijos;
        
        // Si el item seleccionado tiene una ruta cargada, se usa el router para cargarla.
        if(pMenu.Ejecutable != null) {
            this.router.navigate([pMenu.Ejecutable])
        }
    }

    /**
     * Evento que sucede cuando se selecciona el item Inicio del menu.
     * 
     * @memberof MenuComponent
     */
    onHomeSelected(): void {
        this.listaMenu = this.contextoService.getListaSchemas();
    }

    /**
     * Hook on init del componente.
     * 
     * @memberof MenuComponent
     */
    ngOnInit(){
        this.listaMenu = this.contextoService.getListaSchemas();
    }
}