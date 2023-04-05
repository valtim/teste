import { Component, OnInit } from "@angular/core";
import { MsalService, MsalBroadcastService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { ApiService } from "./shared/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
  title = "SOL";
  
}
