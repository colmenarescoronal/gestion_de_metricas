import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './views/login/login.module'
import { MetricasModule } from './views/metricas/metricas.module';
import { MetricasLayoutModule } from './views/layout/metricas-layout/metricas-layout.module';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: '',
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'metricas',
        loadChildren: () =>
          import('./views/layout/metricas-layout/metricas-layout.module').then(m => m.MetricasLayoutModule),
          canActivate: [AuthGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
