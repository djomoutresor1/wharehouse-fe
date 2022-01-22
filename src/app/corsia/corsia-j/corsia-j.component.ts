import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaJ',
  templateUrl: './corsia-j.component.html',
  styleUrls: ['./corsia-j.component.scss','../../app.component.scss']
})
export class CorsiaJComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
