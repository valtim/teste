import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(
    private authService: MsalService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    localStorage.clear();

    if (window.location.href.indexOf('localhost')){
      window.location.href = window.location.origin;
      return;
    }
      

    this.authService.logoutRedirect({
      postLogoutRedirectUri: '/'
    });
    //this.router.navigate(['/']);
  }

}
