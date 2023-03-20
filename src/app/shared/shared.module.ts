import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';

import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    LoaderComponent
  ], exports: [
    NavbarComponent,
    FooterComponent,
    RatingModule,
    InputTextModule,
    LoaderComponent,
    MatIconModule
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    MatIconModule,
    MenuModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    TabViewModule
  ]
})
export class SharedModule { }
