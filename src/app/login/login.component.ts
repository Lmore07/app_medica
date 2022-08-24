import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

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
          this.router.navigate(['/menu']);
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
}
