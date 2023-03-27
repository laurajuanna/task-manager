import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/tasks`)
  }

  postTask(task: any): Observable<any> {
    return this.http.post('http://localhost:3000/tasks', task);
  }

  putTask(task: any): Observable<any> {
    return this.http.put(`http://localhost:3000/tasks/${task.id}`, task)
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }

  getProjects() {
    return this.http.get<any>(`http://localhost:3000/projects`)
  }

  getProject(id: number) {
    return this.http.get<any>(`http://localhost:3000/projects/${id}`)
  }

  postProjects(project: any): Observable<any> {
    return this.http.post('http://localhost:3000/projects', project);
  }

  putProjects(project: any): Observable<any> {
    return this.http.put(`http://localhost:3000/projects/${project.id}`, project)
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/projects/${id}`);
  }
}
