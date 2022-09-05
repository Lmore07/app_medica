import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { EmailJSResponseStatus,send} from '@emailjs/browser';
import Swal from 'sweetalert2';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  form_contacto : any = FormGroup;
  medicos:any;
  get f() { 
    return this.form_contacto.controls; }

  constructor(private formBuilder: FormBuilder, private user_servcie:UsuarioService) { }

  ngOnInit(): void {
    this.user_servcie.medicos_Activos().subscribe(result => {
      console.log(result);
      this.medicos = result
    });
    this.form_contacto= this.formBuilder.group({
      nombre: [''],
      correo: [''],
      mensaje: ['']
      });
  }

  copiar(email:any){
    var copyTextarea = document.createElement("textarea");
    copyTextarea.style.position = "fixed";
    copyTextarea.style.opacity = "0";
    copyTextarea.textContent = email;
  
    document.body.appendChild(copyTextarea);
    copyTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(copyTextarea);
    Swal.fire({
      icon: 'success',
      title: 'Se copio el correo en el portapapeles'
    })
  }

  onSubmit(){
    send('service_q2fm3u8', 'template_z35mupx', {from_name: this.form_contacto.value.nombre,
      from_e: 'lmoreiration@uteq.edu.ec',
      to_e:this.form_contacto.value.correo,
      message:this.form_contacto.value.mensaje}, 
      'gdslfh3NeGs2_786Z').then(function(response){
        if(response.text=='OK'){
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado correctamente'
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Tu mensaje no fue enviado'
          })
        }
      });
      (<HTMLInputElement> document.getElementById("nombre")).value="";
      (<HTMLInputElement> document.getElementById("mensaje")).value="";
      (<HTMLInputElement> document.getElementById("correo")).value="";

    }

}
