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
import { GaugesChartComponent } from './gauge-chart/gaugeschart.component';


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
    GaugesChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'ELSChart', component: MainComponent },
      { path: 'iso-data', component: IsoChartsComponent },
      { path: 'view-data', component: ViewDataComponent },
      { path: 'app-gauge-chart', component: GaugesChartComponent },
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SignalrISOdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
