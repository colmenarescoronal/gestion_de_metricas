import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarDatoComponent } from './editar-dato.component';

const routes: Routes = [{
  path:'',
  component:EditarDatoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarDatoRoutingModule { }
