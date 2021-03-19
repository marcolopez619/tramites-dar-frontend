import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'sh-universidad-carrera',
  templateUrl: './universidad-carrera.component.html',
  styleUrls: ['./universidad-carrera.component.css']
})
export class UniversidadCarreraComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

}
