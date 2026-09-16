import { Routes } from '@angular/router';

import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';

import { DroneListComponent } from './components/drones/drone-list/drone-list.component';
import { DroneDetailsComponent } from './components/drones/drone-details/drone-details.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: PrincipalComponent,
    children: [

      {
        path: 'drones',
        component: DroneListComponent
      },

      {
        path: 'drones/novo',
        component: DroneDetailsComponent
      },

      {
        path: 'drones/editar/:id',
        component: DroneDetailsComponent
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];