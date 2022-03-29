import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MetricasComponent} from './metricas.component';


const routes: Routes = [
  {
    path:'',
    component:MetricasComponent,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetricasRoutingModule { }
