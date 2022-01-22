import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaC',
  templateUrl: './corsia-c.component.html',
  styleUrls: ['./corsia-c.component.scss','../../app.component.scss']
})
export class CorsiaCComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
