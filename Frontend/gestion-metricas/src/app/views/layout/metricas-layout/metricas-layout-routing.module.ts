import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricasLayoutComponent } from './metricas-layout.component';
import { MetricasModule } from '../../metricas/metricas.module';
import { AuthGuard } from '../../../core/guard/auth.guard';

import { AgregarIndicadorModule } from '../../metricas/agregar-indicador/agregar-indicador.module';
import { EditarIndicadorModule } from '../../metricas/editar-indicador/editar-indicador.module';
import { EliminarIndicadorModule } from '../../metricas/eliminar-indicador/eliminar-indicador.module';

import { AgregarDatoModule } from '../../metricas/agregar-dato/agregar-dato.module';
import { EditarDatoModule } from '../../metricas/editar-dato/editar-dato.module';
import { EliminarDatoModule } from '../../metricas/eliminar-dato/eliminar-dato.module';

const routes: Routes = [
  {
    path: '',
    component: MetricasLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../metricas/metricas.module').then(m => m.MetricasModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'indicador/agregar',
        loadChildren: () =>
          import('../../metricas/agregar-indicador/agregar-indicador.module').then(m => m.AgregarIndicadorModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'indicador/editar',
        loadChildren: () =>
          import('../../metricas/editar-indicador/editar-indicador.module').then(m => m.EditarIndicadorModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'indicador/eliminar',
        loadChildren: () =>
          import('../../metricas/eliminar-indicador/eliminar-indicador.module').then(m => m.EliminarIndicadorModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'dato/agregar',
        loadChildren: () =>
          import('../../metricas/agregar-dato/agregar-dato.module').then(m => m.AgregarDatoModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'dato/editar',
        loadChildren: () =>
          import('../../metricas/editar-dato/editar-dato.module').then(m => m.EditarDatoModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'dato/eliminar',
        loadChildren: () =>
          import('../../metricas/eliminar-dato/eliminar-dato.module').then(m => m.EliminarDatoModule),
          canActivate: [AuthGuard]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetricasLayoutRoutingModule { }
