import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TableComponent } from './pages/projects/components/table/table.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CalendarComponent,
    ProjectsComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
    FullCalendarModule,
    TableModule
  ]
})
export class TaskManagerModule { }
