import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';
import { GoogleChartService } from '../services/google-chart.service';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { loadTblRow } from '../Models/IsoModels';
import { DatePipe } from '@angular/common';
import { MinMaxDate } from '../Models/MiscModels';
import { LoadService } from '../services/load.service';
import { SignalrISOdataService } from '../services/signalr-ISOdata.service';
import { MiscService } from '../services/misc.service';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { ResizedEvent } from 'angular-resize-event';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-load-chart',
  templateUrl: './load-chart.component.html',
  styleUrls: ['./load-chart.component.css']
})
export class LoadChartComponent implements OnInit {

  chartData = new Array<loadTblRow>();

  private gLib: any;
  private minMaxDate: MinMaxDate;
  private loadTable: any;
  private loadDashboard: any;
  private chartTitle: string;
  private loadLine: any;
  private loadDateSlider: any;
  private width: number;
  private height: number;


  constructor(private gChartService: GoogleChartService, private route: ActivatedRoute,
    private signalrService: SignalrISOdataService, private _ngZone: NgZone, private miscSvc: MiscService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', { 'packages': ['corechart', 'table', 'controls'] });
    this.gLib.charts.setOnLoadCallback(this.drawLoadChart.bind(this));
    route.params.subscribe(val => {
      this.chartData = this.route.snapshot.data.LoadData;
    });
  }

  ngOnInit() {
    this.chartData = this.route.snapshot.data.LoadData;
    this.signalrService.LoadmessageReceived.subscribe((data: loadTblRow) => {
      this._ngZone.run(() => {
        this.updateLoadChart(data);
      })
    });
  }

  private options = {

    seriesType: 'line',
    vAxis: { title: 'MwH' },

    colors: ['black'],
    legend: {
      position: 'none'
    },
    //backgroundColor: 'white',
    titleTextStyle: {
      color: 'black',    // any HTML string color ('red', '#cc00cc')
      fontName: 'Helvetica', // i.e. 'Times New Roman'
      fontSize: 16, // 12, 18 whatever you want (don't specify px)
      bold: true,    // true or false
      italic: false,   // true of false
    },
    chartArea: { width: '80%', height: '70%' },
    crosshair: { trigger: 'both' },
    curveType: 'function',
  };

  // }
  private drawLoadChart(options) {


    // Create the dataset (DataTable)
    this.loadTable = new google.visualization.DataTable();
    this.loadTable.addColumn('date', 'Date');
    this.loadTable.addColumn('number', 'Load');
    this.loadTable.addColumn({ type: 'string', role: 'style' });
    this.loadTable.addColumn({ type: 'boolean', role: 'certainty' });

    for (let i = 0; i < this.chartData.length; i++) {
      var chartRow = new Array<Date | number | string | Boolean>();
      var date = new Date(this.chartData[i].timestamp);

      chartRow.push(date);
      chartRow.push(this.chartData[i].instantaneous_Load);
      var day = date.getDay();
      if (day > 0 && day < 6) {
        chartRow.push('opacity: 0.9;' +
          'stroke-width: .8;' +
          'stroke-color: red;' +
          'fill-color: #fff600');
        chartRow.push(true);
      }
      else {

        chartRow.push('opacity: 0.9;' +
          'stroke-width: .1;' +
          'stroke-color: red;' +
          'fill-color: #fff600');
        chartRow.push(false);
      }

      this.loadTable.addRow(chartRow);
    }

    this.chartTitle = 'Load Data as of '  + new Date(this.chartData[this.chartData.length - 1].timestamp).toLocaleTimeString() + ' (EST)';

    this.minMaxDate = this.miscSvc.GetMinMaxdate(this.chartData);
    // Create a dashboard.
    var dash_container = document.getElementById('dashboard_div');

    this.loadDashboard = new this.gLib.visualization.Dashboard(dash_container);


    // Create a date range slider
    this.loadDateSlider = new this.gLib.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'control_div',
      'options': {
        // Filter by the date axis.
        'filterColumnIndex': 0,
        'ui': {
          'chartType': 'LineChart',
          'chartOptions': {
            'chartArea': { 'width': '80%' },
            'hAxis': { 'baselineColor': 'none' },
            //colors: ['red'],
            //backgroundColor: '#f5f8fd',
          },
        },

        'state': { 'range': { 'start': this.minMaxDate.MinDate, 'end': this.minMaxDate.MaxDate } }
      }
    });
    
    var date_formatter = new google.visualization.DateFormat({
      pattern: "MMM dd, yyyy,  h:mm aa "
    });
    date_formatter.format(this.loadTable, 0);  // Where 0 is the index of the column

    var formatter = new google.visualization.NumberFormat(
      { suffix: ' MWH', pattern: '#,###' });

    formatter.format(this.loadTable, 1); // Apply formatter to second column


    // Line chart visualization
    this.loadLine = new google.visualization.ChartWrapper({
      'chartType': 'ComboChart',
      'containerId': 'line_div',

      'options': this.options,
    });
    this.loadLine.setOption('title', this.chartTitle);
    // Bind loadLine to the dashboard, and to the controls
    // this will make sure our line chart is update when our date changes
    this.loadDashboard.bind(this.loadDateSlider, this.loadLine);

    this.loadDashboard.draw(this.loadTable);
  }



  private updateLoadChart(data: loadTblRow) {
    this.chartData.push(data);

    this.chartTitle = 'Load Data as of ' + new Date(data.timestamp).toLocaleTimeString('en-US')+ ' (EST)';

    var chartRow = new Array<Date | number | string | Boolean>();
    var date = new Date(data.timestamp);
    chartRow.push(new Date(data.timestamp));
    chartRow.push(data.instantaneous_Load);
    var day = date.getDay();
    if (day > 0 && day < 6) {
      chartRow.push('color:#00f9ff');
      chartRow.push(true);
    }
    else {

      chartRow.push('opacity: 0.1;' +
        'stroke-width: 5;' +
        'stroke-color: #01a0ff;' +
        'fill-color: #fff600');
      chartRow.push(false);
    }

    if (this.loadDashboard != undefined) {
      this.loadTable.addRow(chartRow);
      var date_formatter = new google.visualization.DateFormat({
        pattern: "MMM dd, yyyy,  h:mm aa"
      });
      date_formatter.format(this.loadTable, 0);  // Where 0 is the index of the column

      var formatter = new google.visualization.NumberFormat(
        { suffix: ' MWH', pattern: '#,###' });

      formatter.format(this.loadTable, 1); // Apply formatter to second column

      this.loadLine.setOption('title', this.chartTitle);
      this.loadDashboard.draw(this.loadTable);

    }
  }
  onResized(event: ResizedEvent) {
    this.width = event.newWidth;
    this.height = event.newHeight;


    console.log('width', this.width);
    console.log('height', this.height);

    if (this.loadLine != undefined) {
      this.loadLine.draw();
      this.loadDateSlider.draw();
    }

  }
}