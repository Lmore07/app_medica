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
  get f() { 
    return this.loginForm.controls; }
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
          if(resp.estado==1){
            this.alertas("success",resp.mensaje,"");
            this.router.navigateByUrl("/login");
          }else{
            this.alertas("error", resp.mensaje,"");
          }
        });
    }
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }

  val_correo:any=true;

  valida_correo(evento:any){
      var regex_correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(regex_correo.test(this.loginForm.value.correo)){
        this.val_correo=false;
      }else{
        this.val_correo=true;
      }
      return true;
  }

  solo_letras(evento:any){
    var regex_letras = /^[a-zA-Z\s]*$/;
    if(regex_letras.test(evento.key)){
      return true;
    }else{
      return false;
    }
  }

  solo_numeros(evento:any){
    var regex = /^[0-9]+$/;
    if(evento.keycode==8 || evento.keycode==46){
      return true;
    }
    if(regex.test(evento.key)){
      return true;
    }else{
      return false;
    }
  }
    ngOnInit() {
      let fecha=moment().format("YYYY-MM-DD");
      let fecha_minima=moment().subtract(18, 'years').format("YYYY-MM-DD");
      let fecha_naci:HTMLInputElement=document.querySelector("input[name='fecha_naci']");
      fecha_naci.max = fecha_minima;
      this.loginForm= this.formBuilder.group({
      correo: ['', [Validators.required]],
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