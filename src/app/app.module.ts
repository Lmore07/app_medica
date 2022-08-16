import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './login/doctor/doctor.component';
import { OpcionComponent } from './login/opcion/opcion.component';
import { PacienteComponent } from './login/paciente/paciente.component';
const routes: Routes = [
  { path: 'opciones', component: OpcionComponent },
  { path: 'inici', component: InicioComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    DoctorComponent,
    PacienteComponent, 
    OpcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
