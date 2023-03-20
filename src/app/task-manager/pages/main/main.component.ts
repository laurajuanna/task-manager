import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private config: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      //translations         
    });
  }

}
