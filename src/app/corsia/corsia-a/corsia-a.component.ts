import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaA',
  templateUrl: './corsia-a.component.html',
  styleUrls: ['./corsia-a.component.scss','../../app.component.scss']
})
export class CorsiaAComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
