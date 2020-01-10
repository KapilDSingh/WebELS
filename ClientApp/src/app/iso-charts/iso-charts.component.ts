import { Component, OnInit, NgZone, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { LMP } from '../Models/IsoModels';

import { SignalrISOdataService } from '../services/signalr-ISOdata.service';

import { loadTblRow } from '../Models/IsoModels';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'iso-data',
  templateUrl: './iso-charts.component.html',
  styleUrls: ['./iso-charts.component.css'],
  styles: [':host > *:not(h1) { display: inline-block !important; }'],
})
export class IsoChartsComponent implements OnChanges, OnInit {

  chartData: Array<Array<Date | number | string>>;
  StringToChild: string;
  title: string;
  canSendMessage: boolean;

  charts: Array<{
    title: string,
    type: string,
    // data: Array<Array<Date | number | {}>>,
  }> = [];

 

  constructor(private router: Router,
    private signalrService: SignalrISOdataService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.chartData = new Array<Array<Date | number | string>>();
    this.sendLMPData(20);
  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.sendLMPData(20);
    });
  }
  sendLMPData(n) {
    if (this.canSendMessage) {
      this.signalrService.sendLMPData(n);
    }
  }
  sendLoadData(n) {
    if (this.canSendMessage) {
      this.signalrService.sendLoadData(n);
    }
  }
  processLMPData(lmpData: Array<LMP>) {

    let ChartDataPoints: Array<Array<Date | number | string>> = new Array<Array<Date | number | string>>();

    for (let i = 0; i < lmpData.length; i++) {
      const lmpDate = new Date(lmpData[i].timestamp);
      let dataPoint: Array<Date | number | string> = new Array<Date | number | string>();

    dataPoint.push(lmpDate, lmpData[i].fiveMinuteAvgLMP, lmpData[i].hourlyIntegratedLMP);
      ChartDataPoints.push(dataPoint);
    }
    return ChartDataPoints;
  }
  processLoadData(loadData: Array<loadTblRow>) {
    let ChartDataPoints: Array<Array<Date | number | string>> = new Array<Array<Date | number | string>>();

    for (let i = 0; i < loadData.length; i++) {
      const loadDate = new Date(loadData[i].timestamp);
      ChartDataPoints[i].push(loadDate, loadData[i].Instantaneous_Load, loadData[i].load);
    }
    return ChartDataPoints;
  }


  private PushDataPoints(ChartDataPoints: Array<Array<Date | number | string>>) {
    if (ChartDataPoints.length === 1) {

      this.chartData.shift();
      this.chartData.push(ChartDataPoints[0]);

    } else {

      for (let i = 0; i < ChartDataPoints.length; i++) {

        this.chartData.push(ChartDataPoints[i]);
      }
      
    }
    this.chartData = this.chartData.reverse();
    this.StringToChild = this.chartData[this.chartData.length - 1][0].toString();
  }
  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
      this.sendLMPData(20);
      //this.sendLoadData(20);
    });

    this.signalrService.LMPmessageReceived.subscribe((data: Array<LMP>) => {
      this._ngZone.run(() => {
        this.StringToChild = 'LMP Data as of ';
        const ChartDataPoints = this.processLMPData(data);
        this.PushDataPoints(ChartDataPoints);
      })
    });

    this.signalrService.LoadmessageReceived.subscribe((data: Array<loadTblRow>) => {
      this._ngZone.run(() => {
        this.StringToChild = 'Load Data as of ';
        const ChartDataPoints = this.processLoadData(data);
        this.PushDataPoints(ChartDataPoints);
      })
    });
  }
  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

    }
  }
}
