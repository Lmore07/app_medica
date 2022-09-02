import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  loginForm : any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,public user_service:UsuarioService, public router:Router) {}
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
      var regex = /^[0-9]+$/;
      var regex_letras = /^[a-zA-Z]+$/;
      var regex_correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(this.loginForm.value.cedula) && regex.test(this.loginForm.value.celular) && regex_correo.test(this.loginForm.value.correo) && regex_letras.test(this.loginForm.value.apellidos) && regex_letras.test(this.loginForm.value.nombres) )  {
        this.user_service.registro({correo:this.loginForm.value.correo,cedula:this.loginForm.value.cedula,nombres:this.loginForm.value.nombres,apellidos:this.loginForm.value.apellidos, password:this.loginForm.value.password,fecha_naci:this.loginForm.value.fecha_naci,fecha_registro:this.loginForm.value.fecha_registro,especialidad:this.loginForm.value.especialidad,rol:'MEDICO',direccion:this.loginForm.value.direccion,celular:this.loginForm.value.celular}).subscribe(resp => {
          console.log(resp);
          if(resp.estado==1){
            this.alertas("success",resp.mensaje,"");
            this.router.navigateByUrl("/login");
          }else{
            this.alertas("error", resp.mensaje,"");
          }
        });
      } else {
        this.alertas("error", "Verifique que los campos ingresados sean correctos","");
      } 
      
    }
  }

  

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }
    ngOnInit() {
      let fecha=moment().format("YYYY-MM-DD");
      this.loginForm= this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      fecha_naci: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fecha_registro: [fecha, [Validators.required]]
      });
    }
  }