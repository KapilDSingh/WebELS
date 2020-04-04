import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router } from '@angular/router';
import { MeterData } from '../Models/MeterModel';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-meter-view-chart',
  templateUrl: './meter-view-chart.component.html',
  styleUrls: ['./meter-view-chart.component.css']
})
export class MeterViewChartComponent implements OnInit, OnChanges {
    constructor(
      private router: Router
    ) {
    }
  @Input() StringToChild: string;
  @Input() chartData: Array<Array<Date | number | string>>;
  @Input() chartType: string;

  MeterDataChart: {
    title: string,
    type: string,
    data: Array<Array<string | number | {}>>,
    roles: Array<{ type: string, role: string }>,
    columnNames?: Array<string>,
    options?: {}
  };


    @ViewChild('chart', { static: true })
    chart: GoogleChartComponent;
  public drawMeterDataChart() {
    this.MeterDataChart = {
      title: this.StringToChild,
      type: 'AreaChart',
      data: this.chartData,

      columnNames: ['Time', 'Total KWH'],
      roles: [],
      options: {

        vAxis: { title: 'KWH', ['format']: '$' },
        hAxis: { title: 'Time' },
        seriesType: 'area',

        colors: ['#ffb3ba'],
        legend: 'bottom',
        backgroundColor: '#f5f8fd',
        titleTextStyle: {
          color: 'black',    // any HTML string color ('red', '#cc00cc')
          fontName: 'Monteserrat', // i.e. 'Times New Roman'
          fontSize: 20, // 12, 18 whatever you want (don't specify px)
          bold: false,    // true or false
          italic: true   // true of false
        }
      },
    };
  }


    onReady() {
      console.log('Chart ready');
    }

    onError(error: ChartErrorEvent) {
      console.log('Error: ' + error.toString());
    }

    onSelect(event: ChartEvent) {
      console.log('Selected: ' + event.toString());
    }

    onMouseEnter(event: ChartEvent) {
      console.log('Hovering ' + event.toString());
    }

    onMouseLeave(event: ChartEvent) {
      console.log('No longer hovering ' + event.toString());
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
      this.drawMeterDataChart();
      for (const propName in changes) {
        const chng = changes[propName];
        const cur = JSON.stringify(chng.currentValue);
        const prev = JSON.stringify(chng.previousValue);

      }
    }
  }
