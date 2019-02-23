import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menssage',
  templateUrl: './menssage.component.html',
  styleUrls: ['./menssage.component.css']
})
export class MenssageComponent implements OnInit {

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
    this.api.message.menssage = '';
    this.api.message.callBack = this.onClickCancel;
  }

}
