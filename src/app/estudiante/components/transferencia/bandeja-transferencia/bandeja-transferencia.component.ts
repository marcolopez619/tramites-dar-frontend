import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { BandejaTranseferencia } from '../../../../tramites/models/tramites.models';
import { TransferenciaService } from '../transferencia.service';
import { TransferenciaComponent } from '../transferencia/transferencia.component';

@Component({
  selector: 'app-bandeja-transferencia',
  templateUrl: './bandeja-transferencia.component.html',
  styleUrls: ['./bandeja-transferencia.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaTransferenciaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['origen', 'destino', 'fechaSolicitud', 'motivo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaTranseferencia>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private transferenciaService: TransferenciaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTranseferencias();
  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  getListaTranseferencias(): void {

    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.transferenciaService.getListaTransferencias( idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp =>{
      this.dataSource.data = resp.data ?? [];
    });

  }

  onNuevaSolicitud(): void {
    const dlgNuevoCambioCarrera = this.dialog.open( TransferenciaComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgNuevoCambioCarrera.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        this.getListaTranseferencias();
      }
    });
  }
}
