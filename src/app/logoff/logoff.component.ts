import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(
    private authService: MsalService
    ) { }

  ngOnInit(): void {
    localStorage.clear();
    
    this.authService.logoutRedirect({
      postLogoutRedirectUri: '/'
  });
    //this.router.navigate(['/']);
  }

}
