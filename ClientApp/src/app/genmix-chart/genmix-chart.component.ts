import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router } from '@angular/router';
import { fuelTypeData } from '../Models/IsoModels';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-genmix-chart',
  templateUrl: './genmix-chart.component.html',
  styleUrls: ['./genmix-chart.component.css']
})
export class GenmixChartComponent implements OnInit, OnChanges  {
  constructor(
    private router: Router
  ) {
  }


  @Input() StringToChild: string;
  @Input() chartData: Array<Array<Date | number | string>>;
  @Input() chartType: string;

  GenmixChart: {
    title: string,
    type: string,
    data: Array<Array<string | number | {}>>,
    roles: Array<{ type: string, role: string }>,
    columnNames?: Array<string>,
    options?: {}
  };

  @ViewChild('chart')   chart: GoogleChartComponent;

  public drawGenmixChart() {
    this.GenmixChart = {
      title: this.StringToChild,
      type: 'AreaChart',
      data: this.chartData,
      columnNames: ['timestamp', 'Gas', 'Nuclear', 'Coal', 'Hydro', 'Wind', 'Solar', 'Multiple Fuels', 'Other Renewables', 'Oil', 'Other', 'Storage'],
      roles: [],
      options: {
        isStacked: 'percent',
        vAxis: {title: 'Generation Mix', ['format']: 'percent'},
        hAxis: {title: 'Time'},


       legend: {position: 'bottom', maxLines: 4},
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
  ngAfterViewInit() {
    console.log('Hello ', this.chart.data);
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
    this.drawGenmixChart();
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);

    }
  }
}


