import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaK',
  templateUrl: './corsia-k.component.html',
  styleUrls: ['./corsia-k.component.scss','../../app.component.scss']
})
export class CorsiaKComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
