import { CrearNuevoCiteComponent } from './../crear-nuevo-cite/crear-nuevo-cite.component';
import { BaseComponent } from './../../../shared/base.component';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CiteModel } from '../../models/cites.models';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-bandeja-cites',
  templateUrl: './bandeja-cites.component.html',
  styleUrls: ['./bandeja-cites.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaCitesComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tipoDocumento', 'numeroCite', 'destinatarios', 'referencia', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<CiteModel>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private router: Router,
    private dialog: MatDialog
  ) {  super(); }

  ngOnInit(): void {
    const listaVias: Array<string> = [ 'SARDINA GUMUCIO FLORIPONDIO', 'CONDORI MALPARTIDA TIRADO' ];
    const listaVias2: Array<string> = [ 'ZARZURI TIRADO ELBA', 'ARCE CATARI GONZALES' ];

    const listaCites: Array<CiteModel> = [
      {
        idCiteModel: 1,
        tipoDocumento : 'Interno',
        numeroCite : 'SEGIP/DES/2334_2021',
        destinatarios : listaVias,
        referencia : 'ALGUNA REFERENCIA DE M....',
        fechaCreacion : new Date()
      },
      {
        idCiteModel: 2,
        tipoDocumento : 'Externo',
        numeroCite : 'SEGIP/DES/77774_2021',
        destinatarios : listaVias2,
        referencia : 'Otra referencia....',
        fechaCreacion : new Date(2000, 0, 15)
      }
    ];

    this.dataSource.data = listaCites;
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

  onCrearNuevoCite(): void {
    const dlgNuevoCite = this.dialog.open( CrearNuevoCiteComponent,  {
      disableClose: false,
      width: '1000px',
      data: {

      }
    });
    dlgNuevoCite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        //..
      }
    });

  }

  onEdit(pCiteModel: CiteModel): void {
    console.log( `EDITANDO ---> ${pCiteModel}` );
  }

  onGenerateHojaRuta(pCiteModel: CiteModel): void {
    console.log( `GENERANDO ---> ${pCiteModel}` );
  }

  onPrintHojaRuta(pCiteModel: CiteModel): void {
    console.log( `IMPRIMIENDO ---> ${pCiteModel}` );
  }

}
