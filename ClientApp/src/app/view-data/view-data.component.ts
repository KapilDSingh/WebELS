
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router } from '@angular/router';
import { LMP } from '../Models/IsoModels';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css'],
  styles: [':host > *:not(h1) { display: inline-block !important; }']
})
export class ViewDataComponent implements OnInit, OnChanges {
  @Input() StringToChild: string;
  @Input() chartData: Array<Array<Date | number | string>>;
  @Input() chartType: string;



  charts: Array<{
    title: string,
    type: string,
    data: Array<Array<Date | number | string | {}>>,
    roles: Array<{type: string, role: string}>,
    columnNames?: Array<string>,
    options?: {}
  }> = [];
  changeLog: any;

  @ViewChild('chart2', { static: false })
  chart: GoogleChartComponent;
  constructor(
    private router: Router
  ) {
  }

  public drawLMPChart() {

    this.charts.length = 0;
    this.charts.push({
      title: this.StringToChild,
      type: 'AreaChart',
      columnNames: ['Time', '5 Minute Avg. LMP', 'Hourly Integrated LMP'],
      data: this.chartData,

      roles: []
    });
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
    this.drawLMPChart();
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

    }
  }
}


