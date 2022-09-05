import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { format } from 'path';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  loginForm : any = FormGroup;
  medicos:any;
  submitted = false;
  especialidad:any;
  static id_cita:any;
  static id_turno:any;
  static fecha:any;
  static especialidad:any;
  static id_medico:any;
  static hora:any;
  static reagendar=false;
  id_medico:any;

  constructor( private formBuilder: FormBuilder,public user_service:UsuarioService,public router:Router){}

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
      
    }
   
  }

  seleccionar_especialidad(){
    this.medicos=[]
    if(this.especialidad!=0){
      if(this.especialidad==1){
        this.user_service.obtener_nombres_medicos({especialidad:'Centro Obstétrico'}).subscribe(resp => {
          console.log(resp);
          this.loginForm.value='Centro Obstétrico'
          this.medicos = resp;
          this.id_medico=null;
          this.hora_cita();
        });
      }else if(this.especialidad==2){
        this.user_service.obtener_nombres_medicos({especialidad:'Pediatría'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Pediatría'
          this.id_medico=null;
          this.hora_cita();
        });
      }else if(this.especialidad==3){
        this.user_service.obtener_nombres_medicos({especialidad:'Anastesiología'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Anastesiología'
          this.id_medico=null;
          this.hora_cita();
        });
      }else if(this.especialidad==4){
        this.user_service.obtener_nombres_medicos({especialidad:'Consulta Externa'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Consulta Externa'
          this.id_medico=null;
          this.hora_cita();
        });
      }else if(this.especialidad==5){
        this.user_service.obtener_nombres_medicos({especialidad:'Ginecología'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Ginecología'
          this.id_medico=null;
          this.hora_cita();
        });
      }else if(this.especialidad==6){
        this.user_service.obtener_nombres_medicos({especialidad:'Traumatología'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Traumatología'
          this.id_medico=null;
          this.hora_cita();
        });
      }else if(this.especialidad==7){
        this.user_service.obtener_nombres_medicos({especialidad:'Medicina General'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value.especialidad_='Medicina General'
          this.id_medico=null;
          this.hora_cita();
        });
      }
    }
  }

  seleccionar_id_especialidad(especialidad: string):any {
    if(especialidad=="Centro Obstétrico"){
      return 1;
    }else if(especialidad=="Pediatría"){
      return 2;
    }else if(especialidad=="Anastesiología"){
      return 3;
    }else if(especialidad=="Consulta Externa"){
      return 4;
    }else if(especialidad=="Ginecología") {
      return 5;
    }else if(especialidad=="Traumatología"){
      return 6;
    }else if(especialidad=="Medicina General"){
      return 7;
    }
  }

  agendar(){
    let hora_inicio: moment.Moment = moment(this.loginForm.value.fechaCita);
    if(hora_inicio.day()!=0){
      let fecha=moment(hora_inicio).format("YYYY-MM-DD");
      let hora :String=this.loginForm.value.hora;
      let horas=hora.split(':');
      hora_inicio=moment(hora_inicio).hour(parseInt(horas[0]));
      hora_inicio= moment(hora_inicio).minutes(parseInt(horas[1]));
      let hora_inicio_string=moment(hora_inicio).format("HH:mm");
      let hora_fin_string=moment(hora_inicio).add(1, 'hours').format("HH:mm");
      if(CitasComponent.reagendar){
        this.user_service.modifica_datos_cita({hora_empieza:hora_inicio_string, hora_termina:hora_fin_string, fecha:fecha, id_medico:this.loginForm.value.medico,id_turno:CitasComponent.id_turno}).subscribe(response => {
          if(response.estado==1){
            this.alertas("success",response.mensaje,"");
          }else{
            this.alertas("error", response.mensaje,"");
          }
          CitasComponent.reagendar=false;
        });
      }else{
        this.user_service.registro_cita_turno({hora_empieza:hora_inicio_string, hora_termina:hora_fin_string, fecha:fecha, id_medico:this.loginForm.value.medico,id_paciente:sessionStorage.getItem("id")}).subscribe(resp =>{
          if(resp.estado==1){
            this.alertas("success",resp.mensaje,"");
          }else{
            this.alertas("error", resp.mensaje,"");
          }
        });
      }
    }else{
      this.alertas("error", "Día domingo no hay atención","");
    }
    
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }

  hora_cita(){
    this.hora_cc.readOnly = true;
    let departamento:HTMLDataListElement = (<HTMLDataListElement>document.getElementById("limittimeslist"));
    if(departamento.hasChildNodes()){
      for(let i=0;i<departamento.childNodes.length;){
        departamento.children.item(0).remove();
      }
    }
    if(this.id_medico!=null && this.loginForm.value.fechaCita!=""){
      this.hora_cc.readOnly = false;
      let fecha=moment(this.loginForm.value.fechaCita).format("YYYY-MM-DD");
      this.user_service.turnos({fecha:fecha,medico:this.id_medico}).subscribe(resp => {
        for(let i=0,j=7; j<22; i++,j++){
          let hora="";
          if(j.toString().length==1){
            hora='0'+j+':00'
          }else{
            hora=j+':00'
          }
          if(j<12 || j>=14){
            if(resp!=null){
              if(i<resp.length){
                if(hora!=resp[i].hora){
                  let option = document.createElement("option");
                  option.value = hora;                 
                  departamento.append(option);
                }
              }else{
                let option = document.createElement("option");
                let departamento:HTMLDataListElement = (<HTMLDataListElement>document.getElementById("limittimeslist"));
                option.value = hora;                 
                departamento.append(option);
              }
            }else{
              let option = document.createElement("option");
              let departamento:HTMLDataListElement = (<HTMLDataListElement>document.getElementById("limittimeslist"));
              option.value = hora;                 
              departamento.append(option);
            }
          }
        }
      });
     
    }
  }

  hora_cc:HTMLInputElement;

  ngOnInit() {
    if(sessionStorage.getItem("login") == null) {
      this.router.navigate(['/inicio']);
    }
    this.hora_cc= (<HTMLInputElement>document.getElementById("hora"))
    this.hora_cc.readOnly = true;
    let fecha_maxima=moment().add(7,'days').format("YYYY-MM-DD");
    let fecha_minima=moment().format("YYYY-MM-DD");
    console.log(fecha_maxima);
    console.log(fecha_minima);
    let fecha_naci:HTMLInputElement=document.querySelector("input[name='fechaCita']");
    fecha_naci.max = fecha_maxima;
    fecha_naci.min = fecha_minima;
    this.user_service.obtener_datos_paciente(sessionStorage.getItem("ced")).subscribe(resp => {
      if (resp.estado == 1){
        this.loginForm= this.formBuilder.group({
          cedula: [resp.cedula, [Validators.required]],
          nombres: [resp.nombres, [Validators.required]],
          apellidos: [resp.apellidos, [Validators.required]],
          edad: [resp.edad, [Validators.required]],
          fechaCita: ['', [Validators.required]],
          hora: ['', [Validators.required]],
          especialidad_: ['', [Validators.required]],
          medico: ['', [Validators.required]]
          });
      }
      if(CitasComponent.reagendar){
        this.especialidad=this.seleccionar_id_especialidad(CitasComponent.especialidad);
        this.seleccionar_especialidad();
        this.id_medico=CitasComponent.id_medico;
        this.loginForm= this.formBuilder.group({
          cedula: [resp.cedula, [Validators.required]],
          nombres: [resp.nombres, [Validators.required]],
          apellidos: [resp.apellidos, [Validators.required]],
          edad: [resp.edad, [Validators.required]],
          fechaCita: [CitasComponent.fecha, [Validators.required]],
          hora: [CitasComponent.hora, [Validators.required]],
          especialidad_: [CitasComponent.especialidad, [Validators.required]],
          medico: [CitasComponent.id_medico, [Validators.required]]
          });
      }
    });
    this.loginForm= this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      fechaCita: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      especialidad_: ['', [Validators.required]],
      medico: ['', [Validators.required]]
      });
  }

}