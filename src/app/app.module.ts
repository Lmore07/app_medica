import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './login/doctor/doctor.component';
import { OpcionComponent } from './login/opcion/opcion.component';
import { PacienteComponent } from './login/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { CitasComponent } from './navbar/citas/citas.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { VercitasComponent } from './navbar/vercitas/vercitas.component';
import { HistoriaComponent } from './navbar/citas/historia/historia.component';
import { VerhistoriasComponent } from './navbar/vercitas/verhistorias/verhistorias.component';
import { MatSliderModule } from '@angular/material/slider';
import { AdministradorComponent } from './navbar/vercitas/administrador/administrador.component';
import { PerfilComponent } from './navbar/citas/perfil/perfil.component';
import { Administrador2Component } from './navbar/vercitas/administrador2/administrador2.component';
import { VerpacientesComponent } from './navbar/citas/verpacientes/verpacientes.component';
import { ForoComponent } from './foro/foro.component';

const routes: Routes = [
  { path: 'opciones', component: OpcionComponent },
  { path: 'inici', component: InicioComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    DoctorComponent,
    PacienteComponent, 
    OpcionComponent, NavbarComponent, CitasComponent, MenuComponent, VercitasComponent, HistoriaComponent, VerhistoriasComponent, AdministradorComponent, PerfilComponent, Administrador2Component, VerpacientesComponent, ForoComponent
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    FormsModule,
    MatSliderModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
