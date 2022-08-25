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

  obtener_datos_paciente(cedula:any): Observable<any> {
    return this.http.get(this.Api + "/paciente/datos/"+cedula);
  }

  obtener_nombres_medicos(datos:any): Observable<any> {
    return this.http.post(this.Api + "/medicos/nombres/",datos);
  }

  registro_cita_turno(datos:any): Observable<any> {
    return this.http.post(this.Api + "/citas/registro/",datos);
  }

  ver_citas_turnos(datos:any): Observable<any> {
    return this.http.get(this.Api + "/paciente/citas/"+datos);
  }

  eliminar_citas(datos:any): Observable<any> {
    return this.http.delete(this.Api + "/citas/eliminar/"+datos);
  }
}
