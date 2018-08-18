import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SonoComponent } from './sono/sono.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'sono', component: SonoComponent },
  {path: '', component: LoginComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
