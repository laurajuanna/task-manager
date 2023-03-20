import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarComponent } from './components/calendar/calendar.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
    FullCalendarModule
  ]
})
export class TaskManagerModule { }
