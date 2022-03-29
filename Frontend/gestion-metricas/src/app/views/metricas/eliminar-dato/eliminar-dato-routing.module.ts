import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EliminarDatoComponent } from './eliminar-dato.component';

const routes: Routes = [{
  path:'',
  component:EliminarDatoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EliminarDatoRoutingModule { }
