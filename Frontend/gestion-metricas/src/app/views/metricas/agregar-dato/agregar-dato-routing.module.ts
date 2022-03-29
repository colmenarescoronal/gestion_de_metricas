import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgregarDatoComponent} from './agregar-dato.component';

const routes: Routes = [
  {
  path:'',
  component: AgregarDatoComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarDatoRoutingModule { }
