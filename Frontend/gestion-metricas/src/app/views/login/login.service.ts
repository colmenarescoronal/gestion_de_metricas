import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Usuario} from './login.model';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(usuario: Usuario){
    return this.http.post(API + '/login',usuario);
  }

  registrarse(usuario:Usuario){
    return this.http.post(API + '/login/registrarse',usuario);
  }

}
