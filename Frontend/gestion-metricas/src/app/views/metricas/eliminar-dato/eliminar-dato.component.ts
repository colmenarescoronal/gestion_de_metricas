import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { MetricasService } from '../metricas.service';
import { Dato, Indicador } from '../metricas.model';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';


@Component({
  selector: 'app-eliminar-dato',
  templateUrl: './eliminar-dato.component.html',
  styleUrls: ['./eliminar-dato.component.scss']
})
export class EliminarDatoComponent implements OnInit {

  @ViewChild('cbIndicador', { read: ElementRef }) indicador!: ElementRef;

  datos: Dato[] = [];
  indicadores: Indicador[] = [];

  idIndicador : number = 0;
  idDato: number = 0;


  constructor(private metricasService: MetricasService, private alertas: SweetAlertService) { }

  ngOnInit(): void {
    this.obtenerIndicadores();
  }

  onChangeIndicador(){
    let idIndicador = this.indicador.nativeElement.value;
    this.idIndicador = idIndicador;
    this.obtenerDatos(idIndicador);
  }

  eliminarDato(idDato:any){
    this.alertas.alertaConfirmacion('Eliminar dato','¿Está seguro que desea eliminar este dato?').then(res=>{
      if(res.isConfirmed ===true){
        this.metricasService.eliminarDato(idDato).subscribe(res=>{
          this.obtenerDatos(this.idIndicador);
        },error=>{
          this.alertas.alertaError('Error','Dato no eliminado');
        });
      }
    })
  }

  obtenerDatos(idIndicador:number){
    this.metricasService.obtenerDatosDeIndicador(idIndicador).subscribe(res=>{
      let respuesta: any = [];
      respuesta = res;
      this.datos = respuesta.body;
    },error=>{});
  }

  obtenerIndicadores() {
    this.metricasService.obtenerIndicadores().subscribe(res => {
      let respuesta: any = [];
      respuesta = res;
      this.indicadores = respuesta.body;
      if(this.indicadores.length>0){
        this.obtenerDatos(respuesta.body[0].ID);
        this.idIndicador = respuesta.body[0].ID;
      }
    }, error => { });
  }

}
