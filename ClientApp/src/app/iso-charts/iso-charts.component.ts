import { Component, OnInit, NgZone, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router, RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';

import { LMP, fuelTypeData } from '../Models/IsoModels';
import { LoadService } from '../services/load.service';

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

  private LMPchartData: Array<Array<Date | number | string>>;
  private LMPStringToChild: string;
  private LMPtitle: string;
  private width: number;
  private height: number;

  canSendMessage: boolean;

  LoadchartData: Array<Array<Date | number | string>>;
  LoadStringToChild: string;
  Loadtitle: string;

  GenmixchartData: Array<Array<Date | number | string>>;
  GenmixStringToChild: string;
  Genmixtitle: string;





  constructor(private router: Router, private route: ActivatedRoute,
    private signalrService: SignalrISOdataService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.LMPchartData = new Array<Array<Date | number | string>>();
    this.LoadchartData = new Array<Array<Date | number | string>>();
    this.GenmixchartData = new Array<Array<Date | number | string>>();

  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.sendLMPData(1512);
      this.sendfuelTypeData(24);
    });
  }

  sendLMPData(n) {
    if (this.canSendMessage) {
      this.signalrService.sendLMPData(n);
    }
  }

  sendfuelTypeData(n) {
    if (this.canSendMessage) {
      this.signalrService.sendfuelTypeData(n);
    }
  }
  processLMPData(lmpData: Array<LMP>) {

    const ChartDataPoints: Array<Array<Date | number | string>> = new Array<Array<Date | number | string>>();

    for (let i = 0; i < lmpData.length; i++) {
      const lmpDate = new Date(lmpData[i].timestamp);
      const dataPoint: Array<Date | number | string> = new Array<Date | number | string>();

      dataPoint.push(lmpDate, lmpData[i].fiveMinuteAvgLMP);
      ChartDataPoints.push(dataPoint);
    }
    return ChartDataPoints;
  }

  processfuelTypeData(fuelTypeData: Array<fuelTypeData>) {
    const ChartDataPoints: Array<Array<Date | number | string>> = new Array<Array<Date | number | string>>();

    for (let i = 0; i < fuelTypeData.length; i++) {
      const genmixDate = new Date(fuelTypeData[i].timestamp);
      const dataPoint: Array<Date | number | string> = new Array<Date | number | string>();
      dataPoint.push(genmixDate, fuelTypeData[i].gas, fuelTypeData[i].nuclear, fuelTypeData[i].coal, fuelTypeData[i].hydro, fuelTypeData[i].wind, fuelTypeData[i].solar, fuelTypeData[i].multipleFuels, fuelTypeData[i].otherRenewables, fuelTypeData[i].oil, fuelTypeData[i].other, fuelTypeData[i].storage);
      ChartDataPoints.push(dataPoint);
    }
    return ChartDataPoints;
  }


  private PushLMPDataPoints(ChartDataPoints: Array<Array<Date | number | string>>) {
    if (ChartDataPoints.length === 1) {

      this.LMPchartData.shift();
      this.LMPchartData.push(ChartDataPoints[0]);

    } else {
      this.LMPchartData.length = 0;
      for (let i = 0; i < ChartDataPoints.length; i++) {

        this.LMPchartData.push(ChartDataPoints[i]);
      }

    }
    this.LMPStringToChild = this.LMPStringToChild + this.LMPchartData[this.LMPchartData.length - 1][0].toString();

  }
  private PushLoadDataPoints(ChartDataPoints: Array<Array<Date | number | string>>) {
    if (ChartDataPoints.length === 1) {

      this.LoadchartData.shift();
      this.LoadchartData.push(ChartDataPoints[0]);

    } else {
      this.LoadchartData.length = 0;
      for (let i = 0; i < ChartDataPoints.length; i++) {

        this.LoadchartData.push(ChartDataPoints[i]);
      }
    }
  }

  private PushfuelTypeDataPoints(ChartDataPoints: Array<Array<Date | number | string>>) {
    if (ChartDataPoints.length === 1) {

      this.GenmixchartData.shift();
      this.GenmixchartData.push(ChartDataPoints[0]);

    } else {
      this.GenmixchartData.length = 0;
      for (let i = 0; i < ChartDataPoints.length; i++) {

        this.GenmixchartData.push(ChartDataPoints[i]);
      }

    }
    this.GenmixStringToChild = this.GenmixStringToChild + this.GenmixchartData[this.GenmixchartData.length - 1][0].toString();
  }
   private getLoad(): void {
  //   this.getLoadSvc.getLoad()
  //     .subscribe(data => {


  //       this.PushLoadDataPoints(data);
  //     }, error => console.error(error));
   }


  private subscribeToEvents(): void {
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
      this.sendLMPData(1152);

      this.sendfuelTypeData(8);
    });

    this.signalrService.LMPmessageReceived.subscribe((data: Array<LMP>) => {
      this._ngZone.run(() => {

        this.LMPStringToChild = 'LMP Data as of ';
        const LMPChartDataPoints = this.processLMPData(data);
        this.PushLMPDataPoints(LMPChartDataPoints);
      });
    });

    this.signalrService.LoadmessageReceived.subscribe((data: Array<loadTblRow>) => {
      this._ngZone.run(() => {
        this.LoadStringToChild = 'Load Data as of ';
        // const LoadChartDataPoints = this.processLoadData(data);
        // this.PushLoadDataPoints(LoadChartDataPoints);
      });
    });

    this.signalrService.GenmixmessageReceived.subscribe((data: Array<fuelTypeData>) => {
      this._ngZone.run(() => {
        this.GenmixStringToChild = 'Generation Mix as of ';
        const GenmixChartDataPoints = this.processfuelTypeData(data);
        this.PushfuelTypeDataPoints(GenmixChartDataPoints);
      });
    });
  }


  ngOnChanges(changes: SimpleChanges) {

    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);

    }
  }
}
