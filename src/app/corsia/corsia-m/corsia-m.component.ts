import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaM',
  templateUrl: './corsia-m.component.html',
  styleUrls: ['./corsia-m.component.scss','../../app.component.scss']
})
export class CorsiaMComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
