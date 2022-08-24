import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  loginForm : any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,private user_service:UsuarioService, public router:Router){}
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
      this.user_service.registro({correo:this.loginForm.value.correo,cedula:this.loginForm.value.cedula,nombres:this.loginForm.value.nombres,apellidos:this.loginForm.value.apellidos, password:this.loginForm.value.password,fecha_naci:this.loginForm.value.fecha_naci,fecha_registro:'',especialidad:'',rol:'PACIENTE',direccion:this.loginForm.value.direccion,celular:this.loginForm.value.celular}).subscribe(resp => {
        console.log(resp);
        if(resp.estado){
          this.alertas("success",resp.mensaje,"");
          this.router.navigateByUrl("/login");
        }else{
          this.alertas("error", resp.mensaje,"");
        }
        this.router.navigateByUrl("/login");
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
  
    ngOnInit() {
      
      this.loginForm= this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fecha_naci: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      celular: ['', [Validators.required]]
      });
    }
  }