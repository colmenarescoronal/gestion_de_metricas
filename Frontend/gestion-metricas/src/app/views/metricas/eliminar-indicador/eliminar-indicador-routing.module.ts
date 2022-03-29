import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarIndicadorComponent } from './eliminar-indicador.component'

const routes: Routes = [{
  path: '',
  component: EliminarIndicadorComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EliminarIndicadorRoutingModule { }
