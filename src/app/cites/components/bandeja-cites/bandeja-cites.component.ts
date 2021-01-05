import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { DestinatarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { CitesService } from '../../cites.service';
import { CiteModelByUsuario, ResultCiteInst } from '../../models/cites.models';
import { BaseComponent } from './../../../shared/base.component';
import { CrearNuevoCiteComponent } from './../crear-nuevo-cite/crear-nuevo-cite.component';
import { DocumentoAdjuntoComponent } from '../../../shared/components/documento-adjunto/documento-adjunto.component';
import { AdjuntarDocumentoComponent } from '../adjuntar-documento/adjuntar-documento.component';

@Component({
  selector: 'app-bandeja-cites',
  templateUrl: './bandeja-cites.component.html',
  styleUrls: ['./bandeja-cites.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaCitesComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tipoDestinatario', 'tipoDocumento', 'numeroCite', 'destinatario', 'referencia', 'fechaCreacion', 'estado'];
  dataSource = new MatTableDataSource<CiteModelByUsuario>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showMouseOverActions = false;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private router: Router,
    private citesService: CitesService,
    private dialog: MatDialog
  ) {  super(); }

  ngOnInit(): void {
    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.getAllCitesFromPersona( idPersonaGd );
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

  private getAllCitesFromPersona( idPersonaGd: number ): void {
    this.citesService.getAllCitesFromPersona( idPersonaGd ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaCitesPersona => {
      listaCitesPersona.data.map( cite => cite.destinatarios = ( cite.destinatarios !== '' ) ? JSON.parse( cite.destinatarios ) as Array<DestinatarioModel> : cite.destinatarios );
      listaCitesPersona.data.map( cite => cite.remitentes = ( cite.remitentes !== '' ) ? JSON.parse( cite.remitentes ) as Array<DestinatarioModel> : cite.remitentes );
      listaCitesPersona.data.map( cite => cite.vias = ( cite.vias !== '' ) ? JSON.parse( cite.vias ) as Array<DestinatarioModel> : cite.vias );
      this.dataSource.data = listaCitesPersona.data as Array<CiteModelByUsuario>;
    });
  }

  onMouseOver(row: CiteModelByUsuario): void{
    row.isRowMouseOver = true;
    this.showMouseOverActions = true;
  }
  onMouseLeave(row: CiteModelByUsuario): void{
    row.isRowMouseOver = false;
    this.showMouseOverActions = false;
  }

  onCrearNuevoCite(): void {
    const dlgNuevoCite = this.dialog.open( CrearNuevoCiteComponent,  {
      disableClose: false,
      width: '1000px',
      data: {

      }
    });
    dlgNuevoCite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        const resultCiteInst = result as ResultCiteInst;
        const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
        this.getAllCitesFromPersona(idPersonaGd);
      }
    });

  }

  onEdit(pCiteModel: CiteModelByUsuario): void {
    console.log( `EDITANDO ---> ${pCiteModel.idCite}` );
  }

  onGenerateHojaRuta(pCiteModel: CiteModelByUsuario): void {
    console.log( `GENERANDO ---> ${pCiteModel.idCite}` );
  }

  onPrintHojaRuta(pCiteModel: CiteModelByUsuario): void {
    console.log( `IMPRIMIENDO ---> ${pCiteModel.idCite}` );
  }

  onUploadArchivo(pCiteModel: CiteModelByUsuario): void {

    const dlgUploadArchivo = this.dialog.open( AdjuntarDocumentoComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        citeSelected : pCiteModel
      }
    });
    dlgUploadArchivo.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        /* const resultCiteInst = result as ResultCiteInst;
        const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
        this.getAllCitesFromPersona(idPersonaGd); */
      }
    });
  }



}
