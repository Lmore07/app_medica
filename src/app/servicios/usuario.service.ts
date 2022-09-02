import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Api: string = "https://app-medica-api.herokuapp.com/api";
  Api: string = "http://localhost:3356/api";


  constructor(public http: HttpClient) { }

  registro(datos:any): Observable<any> {
    return this.http.post(this.Api + "/usuarios/registro",datos);
  }

  modifica_datos_cita(datos:any): Observable<any> {
    return this.http.post(this.Api + "/citas/editar",datos);
  }

  login(datos:any): Observable<any> {
    return this.http.post(this.Api + "/iniciar_sesion",datos);
  }

  obtener_datos_paciente(cedula:any): Observable<any> {
    return this.http.get(this.Api + "/paciente/datos/"+cedula);
  }

  obtener_perfil(cedula:any): Observable<any> {
    return this.http.get(this.Api + "/perfil/datos/"+cedula);
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

  actualizar_datos(datos:any): Observable<any> {
    return this.http.post(this.Api + "/usuarios/actualizacion/",datos);
  }

  obtener_medicos(): Observable<any>{
    return this.http.get(this.Api + "/admin/usuarios/medicos");
  }

  obtener_pacientes(): Observable<any>{
    return this.http.get(this.Api + "/admin/usuarios/pacientes");
  }

  eliminar_pacientes(datos:any): Observable<any>{
    return this.http.delete(this.Api + "/pacientes/eliminar/"+datos);
  }

  info_citas(datos:any): Observable<any>{
    return this.http.get(this.Api + "/paciente/citas/info/"+datos);
  }

  eliminar_medicos(datos:any): Observable<any>{
    return this.http.delete(this.Api + "/pacientes/eliminar/"+datos);
  }
  
  aprobar_medico(datos:any): Observable<any>{
    return this.http.post(this.Api + "/admin/aprobar",datos);
  }

  obtener_citas_medico(datos:any): Observable<any>{
    return this.http.get(this.Api + "/medico/citas/"+datos);
  }
  
  obtener_citas(): Observable<any>{
    return this.http.get(this.Api + "/citas/generales");
  }

  busqueda_citas(cedula:any): Observable<any>{
    return this.http.get(this.Api + "/busqueda/citas/"+cedula);
  }


  obtiene_id_medico(datos:any): Observable<any>{
    return this.http.get(this.Api + "/medico/"+datos);
  }

  insertar_diagnosticos(datos:any): Observable<any>{
    return this.http.post(this.Api + "/diagnostico/registro",datos);
  }

}
