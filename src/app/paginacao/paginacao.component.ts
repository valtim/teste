import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit, OnChanges {

  @Input('perPage')
  private perPage: number;

  @Input('currentPage')
  private currentPage: number;

  @Input('total')
  private total: number;

  @Output() changePage = new EventEmitter<object>();

  private pages: Array<number> = [];
  private lastPage: number;
  private pageForm;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.total && this.perPage) {
      this.lastPage = Math.ceil(this.total / this.perPage);
      this.pages = this.createArrayNumber(this.lastPage);
      this.pages = this.createGroupedArray(this.pages, 5);
    }
  }

  private createGroupedArray(arr: Array<any>, chunkSize: number) {
    const groups = [];
    let i: number;
    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  private createArrayNumber(size: number) {
    return Array.from(new Array(size), (_, index) => index + 1);
  }

  changePaginacao() {
    if (this.currentPage && this.currentPage > 0) {
      this.changePage.emit({ currentPage: this.currentPage, perPage: this.perPage });
    }
  }

}
