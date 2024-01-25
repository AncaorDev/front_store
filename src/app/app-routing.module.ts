import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

// Rutas en constantes
import { URL_ADMIN } from './app.constants';
import { NotFoundComponent } from './admin/pages/404/not-found.component';
import { SCREEN_NOT_FOUND } from './shared/shared.variables';
import { CustomRouterReuseStrategy } from './shared/CustomReuseStrategy';

const routes: Routes = [
  { path: '', redirectTo: `${URL_ADMIN}`, pathMatch: 'full' },
  { path: `${URL_ADMIN}`, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '404', component: NotFoundComponent, data : { screen_view : SCREEN_NOT_FOUND }},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers : [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouterReuseStrategy,
    }]
})

export class AppRoutingModule { }

