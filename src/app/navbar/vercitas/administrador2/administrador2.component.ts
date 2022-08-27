import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador2',
  templateUrl: './administrador2.component.html',
  styleUrls: ['../vercitas.component.css']
})
export class Administrador2Component implements OnInit {

  pacientes:any;
  constructor(public userService:UsuarioService) { }

  ngOnInit(): void {
    this.userService.obtener_pacientes().subscribe(response => {
      this.pacientes = response;
    });
  }

  borrar(id:any,index:any){
    this.userService.eliminar_medicos(id).subscribe(resp => {
      if(resp.estado==1){
        this.pacientes.splice(index, 1);
        this.alertas("success",resp.mensaje,"");
      }else{
        this.alertas("error",resp.mensaje,"");
      }
    });
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto
    })
  }

}
