import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MetricasService } from './metricas.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss']
})
export class MetricasComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartElementRef!: ElementRef;


  obteniendoDatos = true;   //Mostrar loading de obtener datos
  data: any = [];
  labels: any = [];
  backgroundColor: any = [];
  borderColor: any = [];

  backgroundColorRandom = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'];

    borderColorRandom = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'];

/*Datos exportacion a CSV*/
//Variable de opciones
 options = {
  title: 'Gestión de métricas',
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true,
  showTitle: true,
  useBom: true,
  headers: ['Indicador', 'Dato']
};
  //Datos a generar en el archivo CSV
  dataCSV = [];
/*Termina Datos exportacion a CSV*/


  constructor(private metricasService: MetricasService) { }

  ngOnInit(): void {
    this.obtenerTotalDatosPorIndicador();
  }

  ngAfterViewInit() {
  }

  obtenerTotalDatosPorIndicador() {
    this.metricasService.obtenerTotalDatosPorIndicador().subscribe(res => {
      this.obteniendoDatos = false;
      let respuesta: any = [];
      respuesta = res;
      let datos = respuesta.body;
      for (let index = 0; index < datos.length; index++) {
        let indicador = datos[index].NOMBRE_INDICADOR;
        let valor = datos[index].TOTAL_DATOS;

        //Tomamos color aleatorio del arreglo
        let indiceBackground = Math.floor(Math.random() * (this.backgroundColorRandom.length));
        //Tomamos borde aleatorio del arreglo
        let indiceBorder = Math.floor(Math.random() * (this.borderColorRandom.length));

        this.data.push(valor);  //Guardamos dato
        this.labels.push(indicador.toString()); //Guardamos nombreIndicador
        this.backgroundColor.push(this.backgroundColorRandom[indiceBackground].toString()); //Guardamos background color
        this.borderColor.push(this.borderColorRandom[indiceBorder].toString()); //Guardamos border color
      }

      this.dibujarGrafica();

    }, error => {
      this.obteniendoDatos = false;
    });
  }

  dibujarGrafica() {
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: '',
          data: this.data,
          backgroundColor:this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  exportarArchivo(){
    this.obtenerDatosParaExportar();

  }

  obtenerDatosParaExportar(){
    this.metricasService.obtenerDataParaExportar().subscribe(res=>{
      let respuesta: any = [];
      respuesta = res;
      this.dataCSV = respuesta.body;
      new Angular2Csv(this.dataCSV,'gestion_metricas', this.options);
    },error=>{});
  }

}
