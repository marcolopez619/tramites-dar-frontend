import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ClassTipoNotificacionPipe } from './pipes/class-tipo-notificacion.pipe';
import { IconTipoNotificacionPipe } from './pipes/icon-tipo-notificacion.pipe';
import { HoverCardDirective } from './directives/hover-card.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { JsonViewerComponent } from './components/json-viewer/json-viewer.component';
import { ErrorViewerComponent } from './components/error-viewer/error-viewer.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { CellPositionDirective } from './directives/cell-position.directive';
import { ToolbarModalDirective } from './directives/toolbar-modal.directive';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { TableEmptyComponent } from './components/table-empty/table-empty.component';
import { LoaderDirective } from './directives/loader.directive';
import { DisabledDirective } from './directives/disabled.directive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { RightClickOffDirective } from './directives/right-click.directive';
import { RowHoverDirective } from './directives/row-hover.directive';
import { ToolbarErrorDirective } from './directives/toolbar-error.directive';
import { HojaDeRutaComponent } from './components/hoja-de-ruta/hoja-de-ruta.component';

/**
 * Shared modulo que importa y exporta los modulos necesarios para material design, tambien exporta directivas y pipes.
 * @export
 * @class SharedModule
 */
@NgModule({
    declarations: [
        ClassTipoNotificacionPipe,
        IconTipoNotificacionPipe,

        HoverCardDirective,
        AutofocusDirective,
        CellPositionDirective,
        ToolbarModalDirective,
        LoaderDirective,
        DisabledDirective,
        UppercaseDirective,
        RightClickOffDirective,
        RowHoverDirective,
        ToolbarErrorDirective,

        ConfirmDialogComponent,
        JsonViewerComponent,
        ErrorViewerComponent,
        LoaderSpinnerComponent,
        TableEmptyComponent,
        HojaDeRutaComponent
    ],
    imports: [
        CommonModule,
        // Modulos para material design.
        MatAutocompleteModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatStepperModule,
        MatSidenavModule,
        // Modulos para formularios.
        FormsModule,
        ReactiveFormsModule,
        // Modulo para flex layout.
        FlexLayoutModule
    ],
    exports: [
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatStepperModule,
        MatSidenavModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        ClassTipoNotificacionPipe,
        IconTipoNotificacionPipe,

        HoverCardDirective,
        AutofocusDirective,
        CellPositionDirective,
        ToolbarModalDirective,
        LoaderDirective,
        DisabledDirective,
        UppercaseDirective,
        RightClickOffDirective,
        RowHoverDirective,
        ToolbarErrorDirective,

        ConfirmDialogComponent,
        JsonViewerComponent,
        ErrorViewerComponent,
        LoaderSpinnerComponent,
        TableEmptyComponent,
        HojaDeRutaComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class SharedModule { }
