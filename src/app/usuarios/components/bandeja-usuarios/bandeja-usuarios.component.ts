import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { NuevoTramiteComponent } from '../../../tramites/components/nuevo-tramite/nuevo-tramite.component';
import { BandejaUsuarios } from '../../../tramites/models/tramites.models';
import { TramitesService } from '../../../tramites/tramites.service';
import { UsuariosService } from '../../usuarios.service';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-bandeja-usuarios',
  templateUrl: './bandeja-usuarios.component.html',
  styleUrls: ['./bandeja-usuarios.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaUsuariosComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['nombreUsuario', 'perfil', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaUsuarios>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private usuariosService: UsuariosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramites();
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

  private getListaTramites(): void {
    this.usuariosService.getAllListaUsuarios().pipe( takeUntil(this.unsubscribe$)).subscribe( allUsuarios => {
      this.dataSource.data = allUsuarios.data;
    });
  }

  onAddEditTramite(pSelectedUser?: BandejaUsuarios): void {
    const dlgAnadirEditarUsuario = this.dialog.open( UsuarioComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        selectedUser : pSelectedUser
       }
    });
    dlgAnadirEditarUsuario.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaTramites();
      }
    });
  }

}
