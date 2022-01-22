import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaI',
  templateUrl: './corsia-i.component.html',
  styleUrls: ['./corsia-i.component.scss','../../app.component.scss']
})
export class CorsiaIComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
