import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

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
  public propagar = new EventEmitter<object>();

  @Input()
  public loading!: boolean;

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
  }

  public editEntity(item: any) {
    this.propagar.emit(item)
  }

  public eliminar(item: any) {
    this.propagar.emit({ method: 'delete', item })
  }

  deleteEntity(item: any) {
    this.confirmationService.confirm({
      message: '¿Quieres eliminar este registro?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.eliminar(item);
      }
    });
  }

}
