import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to wareHouse Project!';
  rackOfFirstWay = Array.from({length: 6}, (_, i) => i + 1);
  rackPerimeter = Array.from({length: 16}, (_, i) => i + 1);
}

