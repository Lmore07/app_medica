import { Component, OnInit } from '@angular/core';

import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['../citas.component.css']
})
export class HistoriaComponent implements OnInit {

  loginForm : any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,public user_service:UsuarioService){}
  //Agregar acciones del formulario del usuario
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // Detenerse si el formulario no es válido
    if (this.loginForm.invalid) {
        return;
    }
    //Campos llenos
    if(this.submitted)
    {
      this.user_service.registro({correo:this.loginForm.value.correo,cedula:this.loginForm.value.cedula,nombres:this.loginForm.value.nombres,apellidos:this.loginForm.value.apellidos, password:this.loginForm.value.password,fecha_naci:this.loginForm.value.fecha_naci,fecha_registro:this.loginForm.value.fecha_registro,especialidad:this.loginForm.value.especialidad,rol:'MEDICO',direccion:this.loginForm.value.direccion,celular:this.loginForm.value.celular}).subscribe(resp => {
        console.log(resp);
        if(resp.estado){
          alert('Registro exitoso');
        }else{
          alert('Error al registrar');
        }
      });
    }
   
  }
    ngOnInit() {
      
      this.loginForm= this.formBuilder.group({
      expediente: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaIngreso: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      observacion: ['', [Validators.required]]
      });
    }
  }
