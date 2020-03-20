import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { SignalrISOdataService } from './services/signalr-ISOdata.service';
import { GoogleChartsModule } from '../../projects/angular-google-charts/src/public_api';
import { MainComponent } from './ELSChart/main.component';
import { IsoChartsComponent } from './iso-charts/iso-charts.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ViewDataComponent } from './view-data/view-data.component';

import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { UtilService } from './shared/services/util/util.service';
import { NavbarComponent } from './navbar/navbar.component';
import { IntroComponent } from './intro/intro.component';

import {APP_BASE_HREF} from '@angular/common';
import { LoadChartComponent } from './load-chart/load-chart.component';
import { GenmixChartComponent } from './genmix-chart/genmix-chart.component';
import { MeterChartsComponent } from './meter-charts/meter-charts.component';
import { MeterViewChartComponent } from './meter-view-chart/meter-view-chart.component';
import { DashBoardChartComponent } from './dash-board-chart/dash-board-chart.component';
import { GoogleChartService } from './services/google-chart.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MainComponent,
    IsoChartsComponent,
    ViewDataComponent,
    DigitalClockComponent,

    NavbarComponent,
    IntroComponent,
    LoadChartComponent,
    GenmixChartComponent,
    MeterChartsComponent,
    MeterViewChartComponent,
    DashBoardChartComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
    RouterModule.forRoot([
      
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'app-fetch-data', component: FetchDataComponent },
      { path: 'ELSChart', component: MainComponent },
      { path: 'iso-data', component: IsoChartsComponent },
      { path: 'view-data', component: ViewDataComponent },
      { path: 'app-meter-charts', component: MeterChartsComponent },
      { path: 'digital-clock', component: DigitalClockComponent },
      { path: 'app-intro', component: IntroComponent },
      { path: 'app-dash-board-chart', component: DashBoardChartComponent },
      
      { path: 'app-els-chart', component: MainComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }    
    ],
    {
      onSameUrlNavigation: 'reload'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SignalrISOdataService,GoogleChartService, UtilService,{provide: APP_BASE_HREF, useValue: ' '}],
  bootstrap: [AppComponent]
})
export class AppModule { }
