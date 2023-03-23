import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects!: any[];
  private tasks!: any[];

  public sidenav: boolean = false;
  private metodo!: string;

  public tituloForm!: string;

  public cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "dt", header: "DT" },
    { field: "descripcion", header: "Descripción" },
    { field: "color", header: "Color" }
  ]

  constructor(
    private fb: FormBuilder,
    private service: TaskService
  ) {
  }

  ngOnInit() {
    this.getProjects();
    this.getTasks();
  }

  form = this.fb.group({
    id: [],
    name: [],
    dt: [],
    color: [],
    description: [],
    notes: []
  })

  private getProjects() {
    this.service.getProjects().subscribe({
      next: (rs) => {
        this.projects = rs;
      }
    })
  }

  private getTasks() {
    this.service.getTasks().subscribe({
      next: (rs) => {
        this.tasks = rs;
      }
    })
  }

  public propagar(info: any) {
    info.method && this.deleteProject(info.item.id);
    !info.method && this.editProyect(info);
  }

  public newProject() {
    this.metodo = 'nuevo';
    this.form.reset();
    this.tituloForm = 'Agregar Proyecto';
    this.showSidenav();
  }

  public editProyect(item: any) {
    this.metodo = 'editar';
    this.tituloForm = 'Editar Proyecto';
    const { id, nombre, dt, descripcion, notas, color } = item;
    this.form.patchValue({
      id: id,
      name: nombre,
      dt: dt,
      color: color,
      description: descripcion,
      notes: notas
    });
    this.showSidenav();
  }

  public guardar() {
    const { id, name, dt, color, description, notes } = this.form.getRawValue()
    const body = {
      id: id,
      nombre: name,
      dt: dt,
      color: color,
      descripcion: description,
      notas: notes
    }
    this.metodo === 'nuevo' && this.service.postProjects(body).subscribe()
    this.metodo === 'editar' && this.service.putProjects(body).subscribe({
      complete: () => {
        this.updateProjectColor(body);
        this.getProjects();
      },
    })
    this.showSidenav();
  }

  public deleteProject(id: number) {
    this.service.deleteProject(id).subscribe({
      next: (rs) => { console.log('elimine') },
      complete: () => { this.getProjects() }
    })
  }

  public showSidenav() {
    this.sidenav = !this.sidenav;
  }

  private updateProjectColor(project: any) {
    const { color } = this.form.getRawValue();
    this.tasks.forEach((item: any) => {
      let body = item;
      if (item.projectId.toString() === project.id.toString()) {
        body.color = color;
        this.service.putTask(body).subscribe({
          next: (rs) => { console.log('Actualicé') }
        })
      }
    })
  }

}
