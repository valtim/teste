import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutorizacaoService } from '../autorizacao.service';
import { ApiService } from 'src/app/shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private api: ApiService, private autorizacao: AutorizacaoService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (!localStorage.getItem('Authorization') || !this.autorizacao.getRotas().includes(url.split('/')[1])) {
      localStorage.setItem('beforeLogin', url);
      this.api.error = 'Você precisa fazer LOGIN para acessar esta página.';
      this.router.navigate(['']);
      return false;
    }
    if (localStorage.getItem('Authorization')) { return true; }
  }
}
