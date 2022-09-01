import { Component, OnInit } from '@angular/core';

import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['../citas.component.css']
})
export class HistoriaComponent implements OnInit {

  loginForm : any = FormGroup;
  submitted = false;
  receta:any[]=Array();

  constructor( private formBuilder: FormBuilder,public user_service:UsuarioService,public router:Router){}
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
      if(this.receta.length > 0){
        let fecha=moment().format("YYYY-MM-DD");
        this.user_service.insertar_diagnosticos({id_cita:sessionStorage.getItem("cita"), diagnostico:this.loginForm.value.diagnostico,observaciones:this.loginForm.value.observaciones,motivo_ingreso:this.loginForm.value.motivo,id_paciente:sessionStorage.getItem("paciente"),fecha:fecha,medicacion:this.receta,id_turnos:sessionStorage.getItem("turno")}).subscribe(resp =>{
          if(resp.estado==1){
            this.alertas("success",resp.mensaje,"");
          }else{
            this.alertas("error",resp.mensaje,"");
          }
        });
      }else{
        this.alertas("error","Ingrese al menos un medicamente","");
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
      this.user_service.obtener_datos_paciente(sessionStorage.getItem("atencion")).subscribe(resp => {
        this.loginForm= this.formBuilder.group({
          cedula: [resp.cedula, [Validators.required]],
          nombres: [resp.nombres+" "+resp.apellidos, [Validators.required]],
          motivo: ['', [Validators.required]],
          diagnostico: ['', [Validators.required]],
          observaciones: ['', [Validators.required]]
          });
      })
    }

    recetar(){
      Swal.fire({
        title: 'Ingresa la medicación',
        html:
        '<input id="swal-input1" placeholder="Ingresa Medicamento" class="swal2-input">' +
        '<input type="number" id="swal-input2" placeholder="Ingresa Cantidad" class="swal2-input">'+
        '<input id="swal-input3" placeholder="Ingresa Detalle" class="swal2-input">',
        confirmButtonText: 'Agregar',
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: 'Guardar Receta',
        cancelButtonColor: '#E6001B',
        denyButtonColor: '#0BDA51',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value
        ]
    }
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          if(resultado.value[0]!=undefined && resultado.value[1]!=undefined && resultado.value[2]!=undefined){
            var jsonTexto = '{"medicamento":"'+resultado.value[0]+'","cantidad":"'+resultado.value[1]+'","descripcion":"'+resultado.value[2]+'"}';
            var json=JSON.parse(jsonTexto);
            this.receta.push(json);
            this.recetar();
          }else{
            this.recetar();
          }
        }
      });
    }
  }
