import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css']
})
export class WaitComponent implements OnInit {

  loginDisplay: boolean = false;
  autenticacaoOK = false;
  menuOK = false;

  constructor(private authService: MsalService, private api: ApiService, private msalBroadcastService: MsalBroadcastService) { }

  loginOK = false;

  

  ngOnInit(): void {
    
    // if (localStorage.length > 0) {
    //   return;
    // }



    if (localStorage.length == 0) {
      this.authService.loginRedirect();
      localStorage.setItem('tentativa', JSON.stringify(new Date()))
    }

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log('logou:' + this.authService.instance.getAllAccounts()[0].username);
        //this.gravarToken();
      });
  }
}