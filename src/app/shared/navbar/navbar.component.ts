import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public items!: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Calendario', icon: 'pi pi-fw pi-calendar', routerLink: "/tasks/calendar" },
      { label: 'Projectos', icon: 'pi pi-fw pi-check-square', routerLink: "/tasks/projects" }

    ];
  }
}
