import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  Api: string = "http://localhost:3356/api";

  constructor(public http: HttpClient) { }

  registro(datos:any): Observable<any> {
    return this.http.post(this.Api + "/usuarios/registro",datos);
  }

  login(datos:any): Observable<any> {
    return this.http.post(this.Api + "/iniciar_sesion",datos);
  }

}
