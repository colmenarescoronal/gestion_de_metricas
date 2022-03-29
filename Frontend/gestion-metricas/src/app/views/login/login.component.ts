import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './login.model';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService,
    private modalService: NgbModal, private formBuilder: FormBuilder,
    private alertas: SweetAlertService) { }

  ngOnInit(): void {
    localStorage.clear();
  }


  alertaRegistrarse = false; //Mostrar alerta en modal registrarse
  alertaLogin = false;  //Mostrar alerta en loginService
  alertaContrasena = false; //Alerta para contrasenas diferentes
  registrando = false;  //  Spinner de carga para registrarse
  ingresando = false; //Spinner de carga para login


  formLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  });

  formRegistrarse = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    confirmarContrasena: new FormControl('', Validators.required),
  });



  login() {
    if (this.formLogin.value.usuario !== '' &&
      this.formLogin.value.contrasena !== '') { //Validar campos vacios
      this.alertaLogin = false;

      let login: Usuario = {
        USUARIO: this.formLogin.value.usuario,
        CONTRASENA: this.formLogin.value.contrasena
      }

      this.ingresando = true;
      this.loginService.login(login).subscribe(res => {
        let respuesta:any = [];
        respuesta = res;
        this.ingresando = false;
        this.router.navigate(['metricas']);
        localStorage.setItem('token',respuesta.body);

      }, error => {
        this.ingresando = false;
        this.alertas.alertaError('Login Error', 'Revise que el usuario/contraseña sean correctos ');
      });
    }
    else {
      this.alertaLogin = true;
    }
  }


  registrarse() {

    if (this.formRegistrarse.value.usuario !== '' &&
      this.formRegistrarse.value.contrasena !== '' &&
      this.formRegistrarse.value.confirmarContrasena !== '') { //Validar campos vacios
      this.alertaRegistrarse = false;

      if (this.formRegistrarse.value.contrasena === this.formRegistrarse.value.confirmarContrasena) { //Validar contrasenas iguales
        this.alertaContrasena = false;

        let registrarse: Usuario = {
          USUARIO: this.formRegistrarse.value.usuario,
          CONTRASENA: this.formRegistrarse.value.contrasena
        }

        this.registrando = true;
        this.loginService.registrarse(registrarse).subscribe(res => {
          this.registrando = false;
          this.modalService.dismissAll('Usuario registrado');
          this.alertas.alertaRealizado('Usuario registrado');

        }, error => {
          this.registrando = false;
          this.alertas.alertaError('Error', 'Falla en registro de usuario');
        })

      }
      else {
        this.alertaContrasena = true;
      }
    }
    else {
      this.alertaRegistrarse = true;
    }
  }


  mostrarModalRegistrarse(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.alertaRegistrarse = false;
      this.alertaContrasena = false;

    }, (reason) => {
      this.alertaRegistrarse = false;
      this.alertaContrasena = false;
    });
  }



}
