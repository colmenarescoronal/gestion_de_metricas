import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MetricasService } from '../metricas.service';
import { Dato, Indicador } from '../metricas.model';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-dato',
  templateUrl: './editar-dato.component.html',
  styleUrls: ['./editar-dato.component.scss']
})
export class EditarDatoComponent implements OnInit {

  @ViewChild('cbIndicador', { read: ElementRef }) indicador!: ElementRef;

  datos: Dato[] = [];
  indicadores: Indicador[] = [];
  editando = false;
  nombreDato: string = '';
  idIndicador : number = 0;
  idDato: number = 0;

  formEditar = new FormGroup({
    nombre: new FormControl('', Validators.required),

  });

  constructor(private metricasService: MetricasService, private alertas: SweetAlertService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.obtenerIndicadores();
  }

  obtenerDatos(idIndicador:number) {
    this.metricasService.obtenerDatosDeIndicador(idIndicador).subscribe(res=>{
      let respuesta: any = [];
      respuesta = res;
      this.datos = respuesta.body;
    },error=>{});
  }


  confirmaEditar() {

    let dato: Dato = {
      ID: this.idDato,
      ID_INDICADOR: this.idIndicador,
      DES_NOMBRE: this.formEditar.value.nombre
    }

    console.log(dato);

    this.metricasService.editarDato(dato).subscribe(res => {
      this.obtenerDatos(this.idIndicador);
      this.modalService.dismissAll('Dato editado');
      this.alertas.alertaRealizado('Dato editado');
    }, error => {
      this.alertas.alertaError('Error', 'Dato no editado');
    })

  }

  mostrarModalEditar(idDato: any, nombreDato: string, content: any) {
    this.idDato = idDato;

    this.formEditar.setValue({ nombre: nombreDato });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
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

  onChangeIndicador(){
    let idIndicador = this.indicador.nativeElement.value;
    this.idIndicador = idIndicador;
    this.obtenerDatos(idIndicador);
  }

}
