import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { Produtos } from './components/produtos/produtos';
import { ProdutoDetailsComponent } from './components/produto/produto-details/produto-details.component';
import { PaginaAdmin } from './components/layout/pagina-admin/pagina-admin.component';

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
        path: 'produtos',
        component: Produtos
      },
      {
        path: 'produtos/:id',
        component: ProdutoDetailsComponent
      },
      {
        path: 'admin',
        component: PaginaAdmin
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];