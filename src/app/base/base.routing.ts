import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

// Configuración de las rutas
export const baseRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    { path: 'menu', component: MenuComponent },
    { path: 'unauthorized', component: UnauthorizedComponent }
];
