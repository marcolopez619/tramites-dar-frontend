import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
/**
 * Directiva para posicionar un mat cell.
 *
 * @export
 * @class CellPositionDirective
 */
@Directive({
    selector: '[shCellPosition]'
})
export class CellPositionDirective implements OnInit {

    /**
     * Posición para la celda: flex-start, center, flex-end.
     *
     * @type {string}
     * @memberof CellPositionDirective
     */
    @Input('shCellPosition') position: string;

    /**
     * Ctor de la directiva.
     */
    constructor(
        public elementRef: ElementRef
    ) { }

    /**
     * Evento on init.
     *
     * @memberof CellPositionDirective
     */
    ngOnInit(): void {
        this.elementRef.nativeElement.style.display = 'flex';
        this.elementRef.nativeElement.style.justifyContent = this.position;
    }
 }
