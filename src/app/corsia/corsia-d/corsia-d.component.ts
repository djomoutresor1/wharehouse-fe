import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaD',
  templateUrl: './corsia-d.component.html',
  styleUrls: ['./corsia-d.component.scss','../../app.component.scss']
})
export class CorsiaDComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
