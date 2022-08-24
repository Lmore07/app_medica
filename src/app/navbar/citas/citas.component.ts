import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as moment from 'moment';


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

  agendar(){
    console.log(this.loginForm.value);
    let hora_inicio: moment.Moment = moment(this.loginForm.value.fechaCita);
    let hora :String=this.loginForm.value.hora;
    let horas=hora.split(':');
    hora_inicio=moment(hora_inicio).hour(parseInt(horas[0]));
    hora_inicio= moment(hora_inicio).minutes(parseInt(horas[1]));
    let hora_fin: moment.Moment = moment(this.loginForm.value.fechaCita);
    hora_fin=moment(hora_inicio).add(1, 'hours');
    console.log(hora_inicio.format("HH:mm"));
    console.log(hora_fin.format("HH:mm"));
    console.log(this.id_medico)
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