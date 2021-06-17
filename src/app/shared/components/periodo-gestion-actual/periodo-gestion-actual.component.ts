import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { PeriodoGestion } from '../../models/periodo_gestion.model';
import { PeriodoGestionService } from '../../services/periodo-gestion.service';

@Component({
  selector: 'sh-periodo-gestion-actual',
  templateUrl: './periodo-gestion-actual.component.html',
  styleUrls: ['./periodo-gestion-actual.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class PeriodoGestionActualComponent extends BaseComponent implements OnInit {

  periodoGestionLiteral: string;

  constructor(
    private periodoGestionService: PeriodoGestionService
  ) {
    super();
  }

  ngOnInit(): void {

    this.periodoGestionService.getPeriodoActivo().pipe( takeUntil(this.unsubscribe$ )).subscribe( resp => {
      const periodoGestionActivo = resp.data as PeriodoGestion;
      this.periodoGestionLiteral = `GESTION ACADEMICA VIGENTE : ${periodoGestionActivo.periodo} / ${periodoGestionActivo.gestion}`;
    });

  }

}
