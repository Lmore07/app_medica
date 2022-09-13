import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { CitasComponent } from '../citas/citas.component';

@Component({
  selector: 'app-vercitas',
  templateUrl: './vercitas.component.html',
  styleUrls: ['./vercitas.component.css']
})
export class VercitasComponent implements OnInit {

  citas:any;

  cita:any;
  constructor(private userService: UsuarioService,public router:Router) { }

  ngOnInit(): void {
    this.userService.ver_citas_turnos(sessionStorage.getItem("id")).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        var fecha:String=data[i].fecha;
        data[i].fecha = fecha.substring(0, 10);
      }
      this.citas = data;
      if(data.estado==0){
        Swal.fire({
          icon: "error",
          title: "No tiene citas registradas",
          text: ""
        })
      }
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

  informacion(id_cita:any){
    this.userService.info_citas(id_cita).subscribe(response => {
      let filas:any="";
      for(let i=0;i<response.length;i++){
        filas=filas+'<tr>'+
        '<td>'+response[i].medicamento+'</td>'+
        '<td>'+response[i].cantidad+'</td>'+
        '<td>'+response[i].descripcion+'</td>'+
      '</tr>';
      }
      Swal.fire({
        title: 'Información de Cita',
        width:'50%',
        html:
        '<div>'+
          '<div class="row"> '+
                '<label for="swal-input1" >Motivo</label> '+
                '<textarea style="WIDTH: 60%; HEIGHT: 50px;resize:none;" rows="5" class="swal2-input" id="swal-input1" readonly="true">'+response[0].motivo_ingreso+'</textarea>'+
          '</div>' +
          '<div class="row"> '+
              '<label for="swal-input2">Diagnóstico</label> '+
              '<textarea style="WIDTH: 60%; HEIGHT: 50px;resize:none;" rows="5" class="swal2-input" id="swal-input2" readonly="true" >'+response[0].diagnostico+'</textarea>'+
              '</div>' +
          '<div class="row"> '+
              '<label for="swal-input3">Observaciones</label>'+
              '<textarea style="WIDTH: 60%; HEIGHT: 50px;resize:none;" rows="5" class="swal2-input" id="swal-input3" readonly="true" >'+response[0].observaciones+'</textarea>'+
              '</div>'+
        '</div><br>'+
        '<table class="text-center table table-bordered" >'+
          '<thead>'+
            '<tr >'+
              '<th>Medicamento</th>'+
              '<th>Cantidad</th>'+
              '<th>Descripción</th>'+
            '</tr>'+
          '</thead>'+
          '<tbody>'+
           filas+
          '</tbody>'+
        '</table>',
        confirmButtonText: 'Entendido',
        showCancelButton: false
      });
    });
    
  }

}
