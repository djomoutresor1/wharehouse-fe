import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CorsiaAComponent } from './corsia/corsia-a/corsia-a.component';
import { CorsiaBComponent } from './corsia/corsia-b/corsia-b.component';
import { CorsiaCComponent } from './corsia/corsia-c/corsia-c.component';
import { CorsiaDComponent } from './corsia/corsia-d/corsia-d.component';
import { CorsiaEComponent } from './corsia/corsia-e/corsia-e.component';
import { CorsiaFComponent } from './corsia/corsia-f/corsia-f.component';
import { CorsiaGComponent } from './corsia/corsia-g/corsia-g.component';
import { CorsiaHComponent } from './corsia/corsia-h/corsia-h.component';
import { CorsiaIComponent } from './corsia/corsia-i/corsia-i.component';
import { CorsiaJComponent } from './corsia/corsia-j/corsia-j.component';
import { CorsiaKComponent } from './corsia/corsia-k/corsia-k.component';
import { CorsiaLComponent } from './corsia/corsia-l/corsia-l.component';
import { CorsiaMComponent } from './corsia/corsia-m/corsia-m.component';
import { CorsiaNComponent } from './corsia/corsia-n/corsia-n.component';
import { CorsiaPComponent } from './corsia/corsia-p/corsia-p.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CorsiaAComponent,
    CorsiaBComponent,
    CorsiaCComponent,
    CorsiaDComponent,
    CorsiaEComponent,
    CorsiaFComponent,
    CorsiaGComponent,
    CorsiaHComponent,
    CorsiaIComponent,
    CorsiaJComponent,
    CorsiaKComponent,
    CorsiaLComponent,
    CorsiaMComponent,
    CorsiaNComponent,
    CorsiaPComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
