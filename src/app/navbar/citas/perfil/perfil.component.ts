import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['../citas.component.css'],
})
export class PerfilComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted = false;
  seleccionado = sessionStorage.getItem('login');
  select = false;
  constructor(
    private formBuilder: FormBuilder,
    public user_service: UsuarioService
  ) {}
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
      var regex = /^[0-9]+$/;
      var regex_letras = /^[a-zA-Z]+$/;
      if (regex.test(this.loginForm.value.cedula) && regex.test(this.loginForm.value.celular) && regex_letras.test(this.loginForm.value.apellidos) && regex_letras.test(this.loginForm.value.nombres) )  {
        this.user_service
        .actualizar_datos({
          id: sessionStorage.getItem('id'),
          cedula: sessionStorage.getItem('ced'),
          nombres: this.loginForm.value.nombres,
          apellidos: this.loginForm.value.apellidos,
          especialidad: this.loginForm.value.especialidad,
          fecha_naci: this.loginForm.value.fecha_naci,
          celular: this.loginForm.value.celular,
          direccion: this.loginForm.value.direccion,
          rol: sessionStorage.getItem('login'),
        })
        .subscribe((resp) => {
          if (resp.estado == 1) {
            this.alertas('success', resp.mensaje, '');
          } else {
            this.alertas('error', resp.mensaje, '');
          }
        });
      }else{
        this.alertas('error', "Verifique los campos ingresados", '');
      }
    }
  }

  alertas(icono: any, texto: any, titulo: any) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.select = false;
    this.user_service
      .obtener_perfil(sessionStorage.getItem('ced'))
      .subscribe((resp) => {
        console.log(resp);
        let fecha = moment(resp.fecha_naci).format('YYYY-MM-DD');
        if (resp.especialidad == null) {
          resp.especialidad = 'a';
        }
        this.loginForm = this.formBuilder.group({
          cedula: [resp.cedula, [Validators.required]],
          nombres: [resp.nombres, [Validators.required]],
          apellidos: [resp.apellidos, [Validators.required]],
          especialidad: [resp.especialidad, [Validators.required]],
          fecha_naci: [fecha, [Validators.required]],
          celular: [resp.celular, [Validators.required]],
          direccion: [resp.direccion, [Validators.required]],
        });
      });
  }

  editar() {
    this.select = true;
    document.getElementById('nombres').removeAttribute('readonly');
    document.getElementById('apellidos').removeAttribute('readonly');
    document.getElementById('direccion').removeAttribute('readonly');
    document.getElementById('fecha_naci').removeAttribute('readonly');
    document.getElementById('cedula').removeAttribute('readonly');
    document.getElementById('celular').removeAttribute('readonly');
    document.getElementById('especialidad').removeAttribute('readonly');
  }
}
