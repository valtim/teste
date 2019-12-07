import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onClickOK() {
    if (this.api.message.callBack) {
      this.api.message.callBack();
    }
    this.api.message.show = false;
    this.api.message.callBack = this.onClickCancel();
  }

  onClickCancel() {
    this.api.message.show = false;
    this.api.message.message = '';
    this.api.message.callBack = this.onClickCancel;
  }

}
