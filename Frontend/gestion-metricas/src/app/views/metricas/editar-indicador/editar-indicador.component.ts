import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MetricasService } from '../metricas.service';
import { Indicador } from '../metricas.model';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-indicador',
  templateUrl: './editar-indicador.component.html',
  styleUrls: ['./editar-indicador.component.scss']
})
export class EditarIndicadorComponent implements OnInit {


  indicadores: Indicador[] = [];
  editando = false;
  nombreIndicador: string = '';
  idIndicador: number = 0;

  formEditar = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  constructor(private metricasService: MetricasService, private alertas: SweetAlertService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.obtenerIndicadores();
  }

  obtenerIndicadores() {
    this.metricasService.obtenerIndicadores().subscribe(res => {
      let respuesta: any = [];
      respuesta = res;
      this.indicadores = respuesta.body;
    }, error => { });
  }


  confirmaEditar() {

    let indicador: Indicador = {
      ID: this.idIndicador,
      DES_NOMBRE: this.formEditar.value.nombre
    }

    this.metricasService.editarIndicador(indicador).subscribe(res => {
      this.obtenerIndicadores();
      this.modalService.dismissAll('Indicador editado');
      this.alertas.alertaRealizado('Indicador editado');
    }, error => {
      this.alertas.alertaError('Error', 'Indicador no editado');
    })

  }

  mostrarModalEditar(idIndicador: any, nombreIndicador: string, content: any) {
    this.idIndicador = idIndicador;

    this.formEditar.setValue({ nombre: nombreIndicador });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

}
