import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const esLocale = require('@fullcalendar/core/locales/es');

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  public events!: any[];
  public options!: any;

  constructor() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaulDate: new Date(),
      height: 480,
      defaultView: 'timeGridDay',
      locale: esLocale,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth'
      },
      dateClick: this.handleDateClick.bind(this),
      editable: false,
      weekends: false,
      eventClick: this.selectEvent.bind(this),
      minTime: "09:00:00",
      maxTime: "18:00:00",
    }
  }

  ngOnInit() {
    this.events = [
      {
        title: 'Evento 2',
        color: '#8ac2da',
        eventTextColor: '#f00',
        start: new Date('Sun Mar 17 2023 13:50:50 GMT-0300 (hora estándar de Argentina)'),
        description: 'Esta es la descripción'
      },
      {
        title: 'Evento 1',
        color: '#9dfe77b3',
        eventTextColor: '#f00',
        start: new Date('Sun Mar 17 2023 13:00:00 GMT-0300 (hora estándar de Argentina)'),
        end: new Date('Sun Mar 17 2023 13:40:00 GMT-0300 (hora estándar de Argentina)'),
        description: 'Esta es la descripción'
      },
      {
        title: 'Evento 3',
        date: '2023-03-03',
        description: 'Esta es la descripción'
      }
    ]
  }

  public handleDateClick(arg: any) {
    console.log('fecha seleccionada', arg.dateStr)
  }


  public selectEvent(arg: any) {
    const { title, extendedProps } = arg.event;
    console.log('evento', title, extendedProps.description)
  }
}
