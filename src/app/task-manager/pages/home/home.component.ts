import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventInput } from '@fullcalendar/core'
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {


  public events!: EventInput[];
  public projects!: any[];

  public sidenav: boolean = false;

  public tituloForm!: string;

  public isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private confirmationService: ConfirmationService
  ) {
  }

  form = this.fb.group({
    id: [],
    title: [],
    description: [],
    date: [],
    from: [],
    to: [],
    project: [-1],
    color: [],
    duration: []
  })

  getTasks() {
    this.service.getTasks().subscribe({
      next: (rs) => {
        this.events = rs;
      }
    })
  }

  getProjects() {
    this.service.getProjects().subscribe({
      next: (rs) => {
        this.projects = rs;
      }
    })
  }

  ngOnInit() {
    this.getTasks();
    this.getProjects()
  }

  public showSidenav() {
    this.sidenav = !this.sidenav;
  }

  public newTask(event?: any) {
    this.form.reset();
    this.isEditing = false;
    this.tituloForm = 'Agregar Tarea';
    this.form.patchValue({ project: -1 })
    if (event && event.new) {
      const { fecha, desde } = event;
      this.form.patchValue({
        date: fecha,
        from: desde,
        to: desde
      })
    } else {
      this.showSidenav();
    }
  }

  private editTask(event: any) {
    this.form.reset();
    this.isEditing = true;
    this.tituloForm = 'Editar Tarea';
    const { id, titulo, descripcion, fecha, desde, hasta, color, projectId, duracion } = event;
    this.form.patchValue({
      id: id,
      title: titulo,
      description: descripcion,
      date: fecha,
      from: desde,
      to: hasta,
      project: projectId,
      color: color,
      duration: duracion
    })
    if (projectId !== null && projectId !== -1) {
      this.form.controls['color'].disable();
    }
  }

  public procesaPropagar(event: any) {
    event.new ? this.newTask(event) : this.editTask(event);
    this.showSidenav();
  }

  public guardar() {
    const { id, title, date, to, from, description, color, project } = this.form.getRawValue();

    const fechaDesde = new Date(`${date}T${from}:00.000Z`);
    const fechaHasta = from ? new Date(`${date}T${to}:00.000Z`) : null;

    const dura = fechaDesde !== null ?
      moment.duration(moment(fechaHasta).diff(moment(fechaDesde))).asHours() : 1;

    // const duracion = end ? moment .duration(moment(end).diff(moment(start))).asHours() : 1;

    const body = {
      id: id,
      title: title,
      color: color,
      eventTextColor: '#f00',
      start: `${date}T${from}:00.000Z`,
      end: `${date}T${to}:00.000Z`,
      description: description,
      projectId: project,
      duration: dura
    }

    this.callToService(body);
    setTimeout(() => {
      this.getTasks();
    }, 500)
    this.showSidenav();
  }

  private callToService(body: any) {
    if (body.id === null) {
      this.service.postTask(body).subscribe({
        next: (rs) => {
          console.log('POST', rs)
        }
      })
    } else {
      this.service.putTask(body).subscribe({
        next: (rs) => {
          console.log('PUT', rs)
        }
      })
    }
  }

  public clearSelect() {
    this.form.patchValue({ project: -1, color: null })
    this.form.controls['color'].enable();
  }

  public selectProject(select: any) {
    this.service.getProject(select.target.value).subscribe({
      next: (rs) => {
        this.form.patchValue({ color: rs.color });
        this.form.controls['color'].disable();
      }
    })
  }

  private onAcceptDelete() {
    const { id } = this.form.getRawValue()
    this.service.deleteTask(id).subscribe({
      next: (rs) => {
        this.getTasks();
        this.showSidenav();
      }
    })
  }

  public deleteTask() {
    this.confirmationService.confirm({
      message: '¿Quieres eliminar este registro?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.onAcceptDelete();
      }
    });
  }

}
