import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { OpcionComponent } from './login/opcion/opcion.component';
import { PacienteComponent } from './login/paciente/paciente.component';
import { DoctorComponent } from './login/doctor/doctor.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

