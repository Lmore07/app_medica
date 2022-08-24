import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private user_service:UsuarioService, public router:Router) {}
  //Agregar acciones del formulario del usuario
  get f() {
    return this.loginForm.controls;
  }

  public static cedula:any;

  onSubmit() {
    this.submitted = true;
    // Detenerse si el formulario no es válido
    if (this.loginForm.invalid) {
      return;
    }
    //Campos llenos
    if (this.submitted) {
      this.user_service.login(this.loginForm.value).subscribe(resp => {
        console.log(resp.estado);
        if (resp.estado != 0) {
          sessionStorage.setItem("login", resp.estado);
          sessionStorage.setItem("ced", resp.cedula);
          sessionStorage.setItem("id",resp.id);
          this.alertas("success", resp.mensaje,"");
          this.router.navigate(['/menu']);
        }else{
          this.alertas("error", resp.mensaje,"");
        }
      });
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    });
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }
}
