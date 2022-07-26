import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { HistoriaComponent } from '../historia/historia.component';

@Component({
  selector: 'app-verpacientes',
  templateUrl: './verpacientes.component.html',
  styleUrls: ['./verpacientes.component.css']
})
export class VerpacientesComponent implements OnInit {

  pacientes:any;
  constructor(public userService:UsuarioService, public router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login") == null) {
      this.router.navigate(['/inicio']);
    }
    this.userService.obtener_citas_medico(sessionStorage.getItem('id')).subscribe(response => {
      console.log(response);
      if (response.length==0 || response.estado==0) {
        this.alertas("error","No tiene citas pendientes","");
      }
      for (let i = 0; i < response.length; i++) {
        var fecha:String=response[i].fecha;
        response[i].fecha = fecha.substring(0, 10);
      }
      this.pacientes = response;
      
    });
  }

  borrar(id:any,index:any){
    
  }

  atender(id:any,id_pac:any,id_cita:any,id_turno:any){
    console.log(id,id_pac,id_turno);
    sessionStorage.setItem('atencion',id);
    sessionStorage.setItem('paciente',id_pac);
    sessionStorage.setItem('cita',id_cita);
    sessionStorage.setItem('turno',id_turno);
    this.router.navigateByUrl("/historias");
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }
}
