// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      /*{
        path: 'proveedores',
        loadComponent: () => import('./proveedores/proveedores.component').then((m) => m.ProveedoresComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoproveedor',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarproveedor/:id',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
        canActivate: [usuariosGuardGuard]
      },*/
      {
        path: 'turista',
        loadComponent: () => import('./turista/turista.component').then((m) => m.TuristaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevoturista',
        loadComponent: () => import('./turista/nuevoturista/nuevoturista.component').then((m) => m.NuevoturistaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarturista/:idTurista',
        loadComponent: () => import('./turista/nuevoturista/nuevoturista.component').then((m) => m.NuevoturistaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarreserva/:id',
        loadComponent: () => import('./reserva/nuevoreserva/nuevareserva.component').then((m) => m.NuevoreservaComponent)
      },
      {
        path: 'nuevoreserva',
        loadComponent: () => import('./reserva/nuevoreserva/nuevoreserva.component').then((m) => m.NuevoreservaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'reserva',
        loadComponent: () => import('./reserva/reserva.component').then((m) => m.reservaComponent)
      },
      /*
      {
        path: 'unidadmedida',
        loadComponent: () => import('./unidadmedida/unidadmedida.component').then((m) => m.UnidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevaunidadmedida',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarunidadmedida/:id',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },*/
      {
        path: 'destino',
        loadComponent: () => import('./destino/destino.component').then((m) => m.destinoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevodestino',
        loadComponent: () => import('./destino/nuevodestino/nuevodestino.component').then((m) => m.NuevodestinoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editardestino/:id',
        loadComponent: () => import('./destino/nuevodestino/nuevodestino.component').then((m) => m.NuevodestinoComponent),
        canActivate: [usuariosGuardGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
