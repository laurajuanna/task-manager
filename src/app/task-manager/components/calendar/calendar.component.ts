import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { OptionsInput } from '@fullcalendar/core';

const esLocale = require('@fullcalendar/core/locales/es');

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnInit {

  @Input()
  events!: any[];

  @Output()
  propagar = new EventEmitter<object>();

  //public events!: any[];
  public options!: OptionsInput;

  constructor() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      timeZone: 'America/Argentina/Buenos_Aires',
      allDaySlot: false,
      height: window.innerHeight - 110,
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
      eventRender: (e) => {
        console.log(e);
        /*var tooltip = new Tooltip(e.el, {
          title: "<h6>" + e.event.title + "</h6>" + e.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body',
          html: true
        });*/
      },
    }
  }

  ngOnInit() {
  }

  public handleDateClick(arg: any) {
    const { dateStr } = arg;
    this.propagar.emit({
      new: true,
      fecha: dateStr.substr(0, 10),
      desde: dateStr.substr(11, 5),
      hasta: dateStr.substr(11, 5)
    })
  }


  public selectEvent(arg: any) {
    const { id, title, extendedProps, start, end, backgroundColor } = arg.event;
    const fecha = start.toJSON().substr(0, 10);
    const desde = start.toJSON().substr(11, 5);
    const hasta = end?.toJSON().substr(11, 5);
    this.propagar.emit({
      new: false,
      id: id,
      titulo: title,
      descripcion: extendedProps.description,
      fecha: fecha,
      desde: desde,
      hasta: hasta,
      color: backgroundColor,
      projectId: extendedProps.projectId
    })
  }
}
