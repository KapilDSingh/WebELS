import { Component, OnInit, NgZone, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MeterData } from '../Models/MeterModel';
import { SignalrISOdataService } from '../services/signalr-ISOdata.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-meter-charts',
  templateUrl: './meter-charts.component.html',
  styleUrls: ['./meter-charts.component.css']
})
export class MeterChartsComponent implements OnChanges, OnInit {

  MeterchartData: Array<Array<Date | number | string>>;
  MeterStringToChild: string;
  Metertitle: string;
  MeterchartType: string;

  canSendMessage: boolean;


  constructor(private router: Router,
    private signalrService: SignalrISOdataService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.MeterchartData = new Array<Array<Date | number | string>>();

  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {


    });
  }
  sendMeterData(n, MeterId) {
    if (this.canSendMessage) {
      this.signalrService.SendMeterData(n, MeterId);
    }
  }

  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
      this.sendMeterData(1000, '550001081');

    });


    this.signalrService.MeterDataMessageReceived.subscribe((data: Array<MeterData>) => {
      this._ngZone.run(() => {


        this.MeterStringToChild = 'Consumption as of ';
        const MeterchartDataPoints = this.processMeterData(data);
        this.Metertitle = 'Consumption Data';


        this.PushMeterDataPoints(MeterchartDataPoints);
      });
    });
  }
  private PushMeterDataPoints(ChartDataPoints: Array<Array<Date | number | string>>) {
    if (ChartDataPoints.length === 1) {

      this.MeterchartData.shift();
      this.MeterchartData.push(ChartDataPoints[0]);

    } else {
      this.MeterchartData.length = 0;
      for (let i = 0; i < ChartDataPoints.length; i++) {

        this.MeterchartData.push(ChartDataPoints[i]);
      }

    }
    this.MeterStringToChild = this.MeterStringToChild + this.MeterchartData[this.MeterchartData.length - 1][0].toString();
    this.MeterchartType = 'AreaChart';
  }
  processMeterData(meterData: Array<MeterData>) {

    const ChartDataPoints: Array<Array<Date | number | string>> = new Array<Array<Date | number | string>>();

    for (let i = 0; i < meterData.length; i++) {
      const lmpDate = new Date(meterData[i].timestamp);
      const dataPoint: Array<Date | number | string> = new Array<Date | number | string>();

      dataPoint.push(lmpDate, meterData[i].kWhTot);
      ChartDataPoints.push(dataPoint);
    }
    return ChartDataPoints;
  }
  ngOnChanges(changes: SimpleChanges) {

    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);

    }
  }
}
