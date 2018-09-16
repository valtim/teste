import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DiarioBordoComponent } from './diario/diario-bordo/diario-bordo.component';
import { DiarioEditarComponent } from './diario/diario-editar/diario-editar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'diario-bordo', component: DiarioBordoComponent },
  { path: 'diario-bordo/editar', component: DiarioEditarComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
