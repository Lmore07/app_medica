import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private user_service:UsuarioService) {}
  //Agregar acciones del formulario del usuario
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // Detenerse si el formulario no es válido
    if (this.loginForm.invalid) {
      return;
    }
    //Campos llenos
    if (this.submitted) {
      this.user_service.login(this.loginForm.value).subscribe(resp => {
        console.log(resp);
        if(resp.estado){
          alert('Login exitoso');
        }else{
          alert('Error al iniciar');
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
