import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaF',
  templateUrl: './corsia-f.component.html',
  styleUrls: ['./corsia-f.component.scss','../../app.component.scss']
})
export class CorsiaFComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
