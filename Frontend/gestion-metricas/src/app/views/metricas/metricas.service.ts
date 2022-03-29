import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dato } from './metricas.model';
import { Indicador } from './metricas.model';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MetricasService {

  constructor(private http: HttpClient) { }

  obtenerIndicadores() {
    return this.http.get(API + '/indicadores');
  }

  obtenerTotalDatosPorIndicador(){
    return this.http.get(API + '/indicadores/totalDatos');
  }

  registrarIndicador(indicador: Indicador) {
    return this.http.post(API + '/indicadores/nuevo', indicador);
  }

  editarIndicador(indicador: Indicador) {
    return this.http.put(API + '/indicadores/actualizar', indicador);
  }

  eliminarIndicador(id: number) {
    return this.http.delete(API + `/indicadores/eliminar/${id}`);
  }

  obtenerDatos() {
    return this.http.get(API + '/datos');
  }

  obtenerDatosDeIndicador(idIndicador:any){
    return this.http.get(API + `/datos/buscar/ID_INDICADOR/${idIndicador}`);
  }

  registrarDato(dato: Dato) {
    return this.http.post(API + '/datos/nuevo',dato);
  }

  editarDato(dato:Dato){
    return this.http.put(API + '/datos/actualizar',dato);
  }

  eliminarDato(id: number){
    return this.http.delete(API + `/datos/eliminar/${id}`);
  }

  obtenerDataParaExportar(){
    return this.http.get(API + `/datos/datosExportar`);
  }

}
