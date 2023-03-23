import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TableComponent implements OnInit {

  @Input()
  public cols!: any[];

  @Input()
  public items!: any[];

  @Output()
  propagar = new EventEmitter<object>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
