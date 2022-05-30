import { Component, OnInit } from '@angular/core';
import en from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    registerLocaleData(en)
  }
}
