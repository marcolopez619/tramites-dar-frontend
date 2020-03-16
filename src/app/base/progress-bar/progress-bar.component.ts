import { Component, ViewChild, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificacionService } from '../../shared/services/notificacion.service';
import { BaseComponent } from '../../shared/base.component';

@Component({
    selector: 'base-progress-bar',
    templateUrl : 'progress-bar.component.html'
})
export class ProgressBarComponent extends BaseComponent implements OnInit {

    /**
	 * Progress bar.
	 *
	 * @private
	 * @type {MatProgressBar}
	 * @memberof ProgressComponent
	 */
    @ViewChild(MatProgressBar, {static: true}) private progressBar: MatProgressBar;

    /**
	 * Observable que recibe el avance del progress bar.
	 *
	 * @type {Observable<number>}
	 * @memberof ProgressComponent
	 */
    progressPercentage$: Observable<number>;

    /**
	 * Creates an instance of ProgressComponent.
	 * @param {ProgressInterceptor} interceptor
	 * @memberof ProgressComponent
	 */
    constructor(private notificacionService: NotificacionService) {
        super();
    }

    /**
	 * ngOnInit Funcion de angular que se ejecuta al momento
	 * de incializar el componente
	 * @memberof ProgressComponent
	 */
    ngOnInit(): void {
        // Enlaza observable local a observable del servicio de notificación.
        this.progressPercentage$ = this.notificacionService.progress$.pipe(
            map(progress => {
                if (progress === undefined) {
                    this.progressBar.mode = 'indeterminate';
                    return 100;
                } else {
                    this.progressBar.mode = 'determinate';
                    return progress;
                }
            })
        );
    }
}
