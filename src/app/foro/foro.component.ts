import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../servicios/websocket.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {


  userChat={
    user:"",
    text:"",
    rol:""
  }

  mensajes;

  constructor(private servicio:WebsocketService,public router:Router) { }

  ngOnInit(): void {
    this.userChat.user=sessionStorage.getItem("user");
    this.userChat.rol=sessionStorage.getItem("login");
    this.servicio.setear_nombre(this.userChat.user);
    this.servicio.listen('leer').subscribe(data => {
      this.mensajes=data
    });
  }

  ngOnDestroy(){
    window.location.reload();
    this.router.navigate(['/foro']);
  }

  devuelve_estilo(usuario:any):String{
    if (usuario != sessionStorage.getItem("user")) {
      return "mensajes-otros-usuarios";
    } else {
      return "mensajes-usuario-actual";
    }
  }

  enviar_mensaje(){
    this.servicio.emit(this.userChat);
    this.userChat.text="";
  }
}
