import { Component, OnInit, NgZone, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router } from '@angular/router';

import { LMP } from '../Models/IsoModels';

import { SignalrISOdataService } from '../services/signalr-ISOdata.service';




@Component({
  selector: 'app-iso-charts',
  templateUrl: './iso-charts.component.html',
  styleUrls: ['./iso-charts.component.css'],
  styles: [':host > *:not(h1) { display: inline-block !important; }'],
})
export class IsoChartsComponent implements OnChanges{
  lmpData: Array<Array<Date | number | string>>;
  StringToChild: string;
  title: string;
  canSendMessage: boolean;
 
  charts: Array<{
    title: string,
    type: string,
    // data: Array<Array<Date | number | {}>>,
  }> = [];

  chartType = 'LMP';

  constructor(private router: Router,
    private signalrService: SignalrISOdataService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.lmpData = new Array<Array<Date | number | string>>();
   
  }

  sendLMPData(n) {
    if (this.canSendMessage) {
      this.signalrService.sendLMPData(n);
    }
  }
  processChartData(lmpTblRow: LMP) {
    const lmpDate = new Date(lmpTblRow.timestamp);
    let dataPoint: Array<Date | number | string> = new Array<Date | number | string>();

    dataPoint.push(lmpDate, lmpTblRow.fiveMinuteAvgLMP,
      lmpTblRow.hourlyIntegratedLMP);
    return dataPoint;
  }

  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
      this.sendLMPData(20);
    });
    this.StringToChild = 'LMP Data as of ';
    this.signalrService.LMPmessageReceived.subscribe((data: Array<LMP>) => {
      this._ngZone.run(() => {
        if (data.length === 1) {
          const dataPoint = this.processChartData(data[0]);
          this.lmpData.shift();
          this.lmpData.push(dataPoint);
          this.StringToChild = dataPoint[0].toString();
        } else {

          for (let i = 0; i < data.length; i++) {
            const dataPoint = this.processChartData(data[i]);
            this.lmpData.push(dataPoint);
          }
          this.lmpData = this.lmpData.reverse();
          this.StringToChild = this.lmpData[this.lmpData.length - 1][0].toString();
        }

      });
    });
  }

ngOnChanges(changes: SimpleChanges) {

  for (let propName in changes) {
    let chng = changes[propName];
    let cur  = JSON.stringify(chng.currentValue);
    let prev = JSON.stringify(chng.previousValue);
    
  }
}
}
