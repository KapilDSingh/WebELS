import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router } from '@angular/router';

import { LMP } from '../Models/IsoModels';

import { SignalrISOdataService } from '../services/signalr-ISOdata.service';

import { Tab } from '../Models/tab.model';


@Component({
  selector: 'app-iso-charts',
  templateUrl: './iso-charts.component.html',
  styleUrls: ['./iso-charts.component.css'],
  styles: [':host > *:not(h1) { display: inline-block !important; }'],
})
export class IsoChartsComponent {
  lmpData: Array<LMP>;
  chartType: string;
  StringToChild = 'THIS IS A STRING TO CHILD';
  title: string;
  canSendMessage: boolean;
  tabs: Tab[];
   charts: Array<{
    title: string,
    type: string,
    data: Array<Array<Date | number | {}>>,
  }> = [];

  constructor(private router: Router,
    private signalrService: SignalrISOdataService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.lmpData = new Array<LMP>();
    this.tabs = [];
    this.tabs.push(new Tab('Lobby', 'Welcome to lobby'));
    this.tabs.push(new Tab('SignalR', 'Welcome to SignalR Room'));

  }

  sendLMPData(n) {
    if (this.canSendMessage) {
         this.signalrService.sendLMPData(n);
    }
  }


  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
      this.sendLMPData(20);
    });

    this.signalrService.messageReceived.subscribe((data: any) => {
      this._ngZone.run(() => {
        this.lmpData = data;
        this.chartType = 'AreaChart';
      });
    });
  }
}
