import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verhistorias',
  templateUrl: './verhistorias.component.html',
  styleUrls: ['../vercitas.component.css']
})
export class VerhistoriasComponent implements OnInit {

  citas:any;

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.userService.obtener_citas().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        var fecha:String=data[i].fecha;
        data[i].fecha = fecha.substring(0, 10);
      }
      this.citas = data
    });
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

  busqueda(){
    let inputValue = (<HTMLInputElement>document.getElementById("ced_buscar")).value;
    this.citas=[]; 
    this.userService.busqueda_citas(inputValue).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        var fecha:String=data[i].fecha;
        data[i].fecha = fecha.substring(0, 10);
      }
      this.citas=data
    });
  }

}
