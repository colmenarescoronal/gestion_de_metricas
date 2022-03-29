/* eslint-disable no-trailing-spaces */
/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alertaConfirmacion(titulo: string, contenido: string): Promise<any> {

    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      backdrop: false,
      allowOutsideClick: false
    });
  }

  alertaError(titulo: string, contenido: string): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      text: contenido,
      backdrop: false,
      allowOutsideClick: false
    });
  }



  alertaRealizado(titulo:string){
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: titulo,
      showConfirmButton: true,
      timer: 1500,
      backdrop: false,
      allowOutsideClick: false
    });
  }



  alertaInfo(titulo: string, contenido: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      backdrop: false,
      allowOutsideClick: false
    });
  }


}
