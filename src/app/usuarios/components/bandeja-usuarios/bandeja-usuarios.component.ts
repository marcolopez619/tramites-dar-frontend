import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { BandejaUsuarios } from '../../../tramites/models/tramites.models';
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

  displayedColumns = ['nickName', 'paterno', 'materno', 'nombres', 'perfil', 'estado', 'acciones'];
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
    this.getListaUsuarios();
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

  getListaUsuarios(): void {
    this.usuariosService.getAllListaUsuarios().pipe( takeUntil(this.unsubscribe$)).subscribe( allUsuarios => {
      this.dataSource.data = allUsuarios.data ?? [];
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddEditusuario(pSelectedUser?: BandejaUsuarios): void {
    const dlgAnadirEditarUsuario = this.dialog.open( UsuarioComponent,  {
      disableClose: false,
      width: '1000px',
      autoFocus: true,
      data: {
        selectedUser : pSelectedUser
       }
    });
    dlgAnadirEditarUsuario.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaUsuarios();
      }
    });
  }

  onDeleteUsuario(pSelectedUser?: BandejaUsuarios): void {
    const dlgEliminarUsuario = this.dialog.open( ConfirmDialogComponent,  {
      disableClose: false,
      width: '600px',
      data: {
        title  : 'Eliminar',
        icon   : 'contact_support',
        content: `¿Seguro de eliminar al usuario : ${pSelectedUser.nickName} ?`
       }
    });
    dlgEliminarUsuario.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {

        this.usuariosService.deleteUsuario( pSelectedUser.idUsuario ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.getListaUsuarios();
        });

      }
    });
  }

}
