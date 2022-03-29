import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarIndicadorComponent } from './editar-indicador.component';

const routes: Routes = [{
path:'',
component:EditarIndicadorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarIndicadorRoutingModule { }
