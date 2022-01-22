import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'corsiaP',
  templateUrl: './corsia-p.component.html',
  styleUrls: ['./corsia-p.component.scss','../../app.component.scss']
})
export class CorsiaPComponent extends AppComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
