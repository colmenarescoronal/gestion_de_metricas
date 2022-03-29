import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgregarIndicadorComponent} from './agregar-indicador.component';

const routes: Routes = [{
  path:'',
  component:AgregarIndicadorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarIndicadorRoutingModule { }
