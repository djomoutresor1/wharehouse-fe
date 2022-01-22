import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaG',
  templateUrl: './corsia-g.component.html',
  styleUrls: ['./corsia-g.component.scss','../../app.component.scss']
})
export class CorsiaGComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
