import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  loginForm : any = FormGroup;
  medicos:any;
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
      
    }
   
  }

especialidad:any;

  seleccionar_especialidad(){
    this.medicos=[]
    if(this.especialidad!=0){
      if(this.especialidad==1){
        this.user_service.obtener_nombres_medicos({especialidad:'Centro Obstétrico'}).subscribe(resp => {
          this.loginForm.value='Centro Obstétrico'
          this.medicos = resp;
        });
      }else if(this.especialidad==2){
        this.user_service.obtener_nombres_medicos({especialidad:'Pediatría'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Pediatría'
        });
      }else if(this.especialidad==3){
        this.user_service.obtener_nombres_medicos({especialidad:'Anastesiología'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Anastesiología'
        });
      }else if(this.especialidad==4){
        this.user_service.obtener_nombres_medicos({especialidad:'Consulta Externa'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Consulta Externa'
        });
      }else if(this.especialidad==5){
        this.user_service.obtener_nombres_medicos({especialidad:'Ginecología'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Ginecología'
        });
      }else if(this.especialidad==6){
        this.user_service.obtener_nombres_medicos({especialidad:'Traumatología'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value='Traumatología'
        });
      }else if(this.especialidad==7){
        this.user_service.obtener_nombres_medicos({especialidad:'Medicina General'}).subscribe(resp => {
          this.medicos = resp;
          this.loginForm.value.especialidad_='Medicina General'
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
    let fecha=moment(hora_inicio).format("YYYY-MM-DD");
    let hora :String=this.loginForm.value.hora;
    let horas=hora.split(':');
    hora_inicio=moment(hora_inicio).hour(parseInt(horas[0]));
    hora_inicio= moment(hora_inicio).minutes(parseInt(horas[1]));
    let hora_inicio_string=moment(hora_inicio).format("HH:mm");
    let hora_fin_string=moment(hora_inicio).add(1, 'hours').format("HH:mm");
    this.user_service.registro_cita_turno({hora_empieza:hora_inicio_string, hora_termina:hora_fin_string, fecha:fecha, id_medico:this.loginForm.value.medico,id_paciente:sessionStorage.getItem("id")}).subscribe(resp =>{
      if(resp.estado==1){
        this.alertas("success",resp.mensaje,"");
      }else{
        this.alertas("error", resp.mensaje,"");
      }
      CitasComponent.reagendar=false;
    });
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }

  id_medico:any;

    ngOnInit() {
      this.user_service.obtener_datos_paciente(sessionStorage.getItem("ced")).subscribe(resp => {
        console.log(resp);
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
          console.log(CitasComponent.hora);
          this.especialidad=this.seleccionar_id_especialidad(CitasComponent.especialidad);
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

    static id_cita:any;
    static id_turno:any;
    static fecha:any;
    static especialidad:any;
    static id_medico:any;
    static hora:any;
    static reagendar=false;
  }