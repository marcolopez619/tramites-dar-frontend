import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { BandejaPrincipalModule } from './bandeja-principal/bandeja-principal.module';
import { BaseModule } from './base/base.module';
import { LayoutComponent } from './base/layout/layout.component';
import { CitesModule } from './cites/cites.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { HojaDeRutaModule } from './hoja-de-ruta/hoja-de-ruta.module';
import { CustomMatPaginator } from './shared/custom.matpaginator';
import { BackendInterceptor } from './shared/interceptors/backend.interceptor';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { ContextoService } from './shared/services/contexto.service';
import { LangService } from './shared/services/lang.service';
import { NotificacionService } from './shared/services/notificacion.service';
import { UtilService } from './shared/services/util.service';
import { TramitesModule } from './tramites/tramites.module';
import { UsuarioModule } from './usuarios/usuario.module';

registerLocaleData(localeEs);

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BaseModule,
        RouterModule.forRoot(appRoutes),
        CitesModule,
        HojaDeRutaModule,
        BandejaPrincipalModule,
        EstudianteModule,
        TramitesModule,
        UsuarioModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        LangService,
        ContextoService,
        UtilService,
        NotificacionService,
        {
            provide: APP_INITIALIZER,
            useFactory: (contexto: ContextoService) => () => contexto.load(),
            deps: [ContextoService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendInterceptor,
            multi: true
        },
        {
            provide:  MatPaginatorIntl,
            useClass:  CustomMatPaginator
        },
        {
            provide: LOCALE_ID,
            useValue: 'es'
        }
    ],
    bootstrap: [
        LayoutComponent
    ],
    exports: []
})
export class AppModule {}
