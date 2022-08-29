import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verpacientes',
  templateUrl: './verpacientes.component.html',
  styleUrls: ['./verpacientes.component.css']
})
export class VerpacientesComponent implements OnInit {

  pacientes:any;
  constructor(public userService:UsuarioService) { }

  ngOnInit(): void {
    this.userService.obtener_citas_medico(sessionStorage.getItem('id')).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        var fecha:String=response[i].fecha;
        response[i].fecha = fecha.substring(0, 10);
      }
      this.pacientes = response;
      console.log(response);
    });
  }

  borrar(id:any,index:any){
    
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }
}
