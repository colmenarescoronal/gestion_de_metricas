import { Component, OnInit } from '@angular/core';
import { MetricasService } from '../metricas.service';
import { Indicador } from '../metricas.model';
import {SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-eliminar-indicador',
  templateUrl: './eliminar-indicador.component.html',
  styleUrls: ['./eliminar-indicador.component.scss']
})
export class EliminarIndicadorComponent implements OnInit {

   indicadores:Indicador[] = [];


  constructor(private metricasService: MetricasService, private alertas:SweetAlertService) { }

  ngOnInit(): void {
    this.obtenerIndicadores();
  }

  obtenerIndicadores(){
    this.metricasService.obtenerIndicadores().subscribe(res=>{
      let respuesta : any = [];
      respuesta = res;
      this.indicadores = respuesta.body;
    },error=>{});
  }

  eliminarIndicador(id: any){
    this.alertas.alertaConfirmacion('Eliminar indicador','¿Está seguro que desea eliminar este indicador?').then(res=>{
      if(res.isConfirmed ===true){
        this.metricasService.eliminarIndicador(id).subscribe(res=>{
          this.obtenerIndicadores();
        },error=>{
          this.alertas.alertaError('Error','No se pudo eliminar el indicador');
        });
      }
    })
  }

}
