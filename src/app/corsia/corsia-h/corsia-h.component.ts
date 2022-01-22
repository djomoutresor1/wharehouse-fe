import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaH',
  templateUrl: './corsia-h.component.html',
  styleUrls: ['./corsia-h.component.scss','../../app.component.scss']
})
export class CorsiaHComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
