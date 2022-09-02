import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['../vercitas.component.css']
})
export class AdministradorComponent implements OnInit {

  medicos:any;
  constructor(public userService:UsuarioService, public router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login") == null) {
      this.router.navigate(['/inicio']);
    }
    this.userService.obtener_medicos().subscribe(resp => {
      this.medicos = resp;
    });
  }

  borrar(id:any,index:any){
    this.userService.eliminar_medicos(id).subscribe(resp => {
      if(resp.estado==1){
        this.medicos.splice(index, 1);
        this.alertas("success",resp.mensaje,"");
      }else{
        this.alertas("error",resp.mensaje,"");
      }
    });
  }

  aprobar_medico(id:any){
    this.userService.aprobar_medico({id:id}).subscribe(resp => {
      if(resp.estado==1){
        this.alertas("success",resp.mensaje,"");
        window.location.reload();
      }else{
        this.alertas("error",resp.mensaje,"");
      }
    });
  }

  alertas(icono:any,texto:any, titulo:any){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      window.location.reload();
    });
  }
  
}
