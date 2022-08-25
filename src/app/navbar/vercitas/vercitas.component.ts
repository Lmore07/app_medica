import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CitasComponent } from '../citas/citas.component';

@Component({
  selector: 'app-vercitas',
  templateUrl: './vercitas.component.html',
  styleUrls: ['./vercitas.component.css']
})
export class VercitasComponent implements OnInit {

  citas:any;
  constructor(private userService: UsuarioService,public router:Router) { }

  ngOnInit(): void {
    this.userService.ver_citas_turnos(sessionStorage.getItem("id")).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        var fecha:String=data[i].fecha;
        data[i].fecha = fecha.substring(0, 10);
      }
      this.citas = data;
      console.log(this.citas);
    });
  }

  borrar(id_cita:any,pos:any){
    console.log(id_cita,pos);
    this.userService.eliminar_citas(id_cita).subscribe(resp => {
      if(resp){

      }
      this.citas.splice(pos, 1);
    });
  }

  agendar(id_cita:any,id_turno:any,id_medico:any,especialidad:any,fecha:any,hora:any) {
    CitasComponent.id_cita=id_cita;
    CitasComponent.id_turno=id_turno;
    CitasComponent.especialidad=especialidad;
    CitasComponent.id_medico=id_medico;
    CitasComponent.fecha=fecha;
    CitasComponent.reagendar=true;
    CitasComponent.hora=hora;
    this.router.navigateByUrl("/citas");
  }

}
