import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
/**
 * Directiva para manejar una card hover.
 *
 * @export
 * @class HoverCardDirective
 */
@Directive({
    selector: '[shHover]'
})
export class HoverCardDirective implements OnInit {

    /**
     * Clase a agregar cuando el card tenga hover.
     *
     * @type {string}
     * @memberof HoverCardDirective
     */
    @Input('shHover') hoverClass: string;

    /**
     * Clase a agregar cuando el card no tenga hover.
     *
     * @type {string}
     * @memberof HoverCardDirective
     */
    @Input('shNotHover') notHoverClass: string;

    /**
     * Creates an instance of HoverCardDirective.
     * @param {ElementRef} elementRef
     * @param {Renderer2} renderer
     * @memberof HoverCardDirective
     */
    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    /**
     * Hook OnInit.
     *
     * @memberof HoverCardDirective
     */
    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, this.notHoverClass);
    }

    /**
     * HostListener del evento mouseover.
     *
     * @memberof HoverCardDirective
     */
    @HostListener('mouseover') cardHover(): void {

        this.renderer.addClass(this.elementRef.nativeElement.lastElementChild, 'animate-icon-menu');
        this.renderer.removeClass(this.elementRef.nativeElement, this.notHoverClass);
        this.renderer.addClass(this.elementRef.nativeElement, this.hoverClass);
    }

    /**
     * HostListener del evento mouseout.
     *
     * @memberof HoverCardDirective
     */
    @HostListener('mouseout') cardNotHover(): void {
        this.renderer.removeClass(this.elementRef.nativeElement.lastElementChild, 'animate-icon-menu');
        this.renderer.removeClass(this.elementRef.nativeElement, this.hoverClass);
        this.renderer.addClass(this.elementRef.nativeElement, this.notHoverClass);
    }
}
