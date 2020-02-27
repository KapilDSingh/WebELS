import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';

import { Router } from '@angular/router';
import { loadTblRow } from '../Models/IsoModels';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-load-chart',
  templateUrl: './load-chart.component.html',
  styleUrls: ['./load-chart.component.css']
})
export class LoadChartComponent implements OnInit, OnChanges  {

 
  @Input() StringToChild: string;
  @Input() chartData: Array<Array<Date | number | string>>;
  @Input() chartType: string;

  LoadChart: {
    title: string,
    type: string,
    data: Array<Array<string | number | {}>>,
    roles: Array<{ type: string, role: string }>,
    columnNames?: Array<string>,
    options?: {}
  }
  
  public drawLoadChart() {
    this.LoadChart = {
      title: this.StringToChild,
      type: 'AreaChart',
      data: this.chartData,
      
      columnNames: ['Time', 'Instantantenous Load'],
      roles: [],
      options: {
        
        vAxis: {title: 'MW', ['format']:'decimal'},
        hAxis: {title: 'Time'},
        
        colors: ['#bae1ff'],
       legend:'bottom',
       backgroundColor: '#f5f8fd',
       titleTextStyle: {
        color: 'black',    // any HTML string color ('red', '#cc00cc')
        fontName: 'Monteserrat', // i.e. 'Times New Roman'
        fontSize: 20, // 12, 18 whatever you want (don't specify px)
        bold: false,    // true or false
        italic:true   // true of false
    }
      },
    };
  }

  @ViewChild('chart', { static: true })
  chart: GoogleChartComponent;
  constructor(
    private router: Router
  ) {
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
    this.drawLoadChart();
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

    }
  }
}


