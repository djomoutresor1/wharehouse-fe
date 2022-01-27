import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../app.component.scss'],
})
export class DashboardComponent extends AppComponent implements OnInit {

   alphabet = Array.from(Array(15)).map((e, i) => i + 65);
   corsie = this.alphabet.map((x) => String.fromCharCode(x));


  constructor() {
    super();
  }

  ngOnInit(): void {}
}
