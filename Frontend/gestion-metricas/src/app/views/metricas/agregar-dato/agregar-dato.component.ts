import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { MetricasService } from '../metricas.service';
import { Dato, Indicador } from '../metricas.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-dato',
  templateUrl: './agregar-dato.component.html',
  styleUrls: ['./agregar-dato.component.scss']
})
export class AgregarDatoComponent implements OnInit {

  registrando = false; // Spinner loading
  indicadores: Indicador[] = [];

  formAgregarDato = new FormGroup({
    nombre: new FormControl('', Validators.required),
    indicador: new FormControl('', Validators.required)
  });

  constructor(private alertas: SweetAlertService, private metricasService: MetricasService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerIndicadores();
  }

  registrarDato() {
    if (this.formAgregarDato.value.nombre !== '' &&
        this.formAgregarDato.value.indicador) {
      this.registrando = true;
      let dato: Dato = {
        ID_INDICADOR: this.formAgregarDato.value.indicador,
        DES_NOMBRE: this.formAgregarDato.value.nombre
      }
      this.metricasService.registrarDato(dato).subscribe(res => {
        this.registrando = false;
        this.alertas.alertaRealizado('Dato registrado');
        this.router.navigate(['metricas']);
      }, error => {
        this.registrando = false;
        this.alertas.alertaError('Error', 'Dato no registrado');
      });
    }
    else {
      this.alertas.alertaError('Error', 'Campos vacíos')
    }
  }

  obtenerIndicadores(){
    this.metricasService.obtenerIndicadores().subscribe(res=>{
      let respuesta: any = [];
      respuesta = res;
      this.indicadores = respuesta.body;
    },error=>{});
  }

}
