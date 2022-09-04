import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket:any;
  server='https://app-medica-api.herokuapp.com';
  
    constructor() { 
      this.socket= io(this.server);
    }
  
    listen(eventName:String) {
      return new Observable((Subscriber) =>{
        this.socket.on(eventName, (data: any) =>{
          Subscriber.next(data);
        })
      })
    }
  
    emit(data: any){
      this.socket.emit('send-message', data);
    }
  
    setear_nombre(nombre:any){
      this.socket.emit('set username', nombre);
    }
}
