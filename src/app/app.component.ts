import { Component, OnInit } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  
  subscription: Subscription;

  constructor(private primeNGConfig: PrimeNGConfig, private translateService: TranslateService) {
    translateService.setDefaultLang('pt');
    this.subscription = this.translateService.stream('primeng').subscribe((data) => {
      this.primeNGConfig.setTranslation(data);
    });
  }

  ngOnInit() {
  }

  
  title = "SOL";

}
