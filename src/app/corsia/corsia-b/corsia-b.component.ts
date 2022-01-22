import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaB',
  templateUrl: './corsia-b.component.html',
  styleUrls: ['./corsia-b.component.scss','../../app.component.scss']
})
export class CorsiaBComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
