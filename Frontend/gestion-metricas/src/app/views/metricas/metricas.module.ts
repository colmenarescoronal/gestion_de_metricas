import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricasRoutingModule } from './metricas-routing.module';
import { AgregarIndicadorComponent } from './agregar-indicador/agregar-indicador.component';
import { EliminarIndicadorComponent } from './eliminar-indicador/eliminar-indicador.component';
import { EditarIndicadorComponent } from './editar-indicador/editar-indicador.component';
import { AgregarDatoComponent } from './agregar-dato/agregar-dato.component';
import { EditarDatoComponent } from './editar-dato/editar-dato.component';
import { EliminarDatoComponent } from './eliminar-dato/eliminar-dato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarIndicadorComponent,
    EliminarIndicadorComponent,
    EditarIndicadorComponent,
    AgregarDatoComponent,
    EditarDatoComponent,
    EliminarDatoComponent
  ],
  imports: [
    CommonModule,
    MetricasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MetricasModule { }
