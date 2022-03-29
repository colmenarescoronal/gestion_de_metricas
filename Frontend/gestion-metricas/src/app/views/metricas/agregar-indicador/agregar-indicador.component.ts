import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { MetricasService } from '../metricas.service';
import { Indicador } from '../metricas.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-indicador',
  templateUrl: './agregar-indicador.component.html',
  styleUrls: ['./agregar-indicador.component.scss']
})
export class AgregarIndicadorComponent implements OnInit {

  registrando = false; // Spinner loading

  formAgregarIndicador = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  constructor(private alertas: SweetAlertService, private metricasService: MetricasService,
    private router: Router) { }

  ngOnInit(): void {
  }


  registrarIndicador() {
    if (this.formAgregarIndicador.value.nombre !== '') {
      this.registrando = true;
      let indicador: Indicador = {
        DES_NOMBRE: this.formAgregarIndicador.value.nombre
      }
      this.metricasService.registrarIndicador(indicador).subscribe(res => {
        this.registrando = false;
        this.alertas.alertaRealizado('Indicador registrado');
        this.router.navigate(['metricas']);
      }, error => {
        this.registrando = false;
        this.alertas.alertaError('Error', 'Indicador no registrado');
      });
    }
    else {
      this.alertas.alertaError('Error', 'Campos vacíos')
    }
  }

}
