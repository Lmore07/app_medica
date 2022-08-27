import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { OpcionComponent } from './login/opcion/opcion.component';
import { PacienteComponent } from './login/paciente/paciente.component';
import { DoctorComponent } from './login/doctor/doctor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { CitasComponent } from './navbar/citas/citas.component';
import { VercitasComponent } from './navbar/vercitas/vercitas.component';
import { HistoriaComponent } from './navbar/citas/historia/historia.component';
import { VerhistoriasComponent } from './navbar/vercitas/verhistorias/verhistorias.component';
import { AdministradorComponent } from './navbar/vercitas/administrador/administrador.component';
import { PerfilComponent } from './navbar/citas/perfil/perfil.component';
import { Administrador2Component } from './navbar/vercitas/administrador2/administrador2.component';

const routes: Routes = [
  { path: 'verperfil', component: PerfilComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'administrador2', component: Administrador2Component },
  { path: 'verhistorias', component: VerhistoriasComponent },
  { path: 'historias', component: HistoriaComponent },
  { path: 'vercitas', component: VercitasComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'opciones', component: OpcionComponent },
  { path: 'inicio', component: InicioComponent },
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

