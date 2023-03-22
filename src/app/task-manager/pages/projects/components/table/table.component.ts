import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  public cols!: any[];

  @Input()
  public items!: any[];

  @Output()
  propagar = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  public editEntity(item: any) {
    this.propagar.emit(item)
  }

}
