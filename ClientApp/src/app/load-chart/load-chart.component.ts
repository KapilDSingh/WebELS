import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { ChartErrorEvent, ChartEvent, GoogleChartComponent } from '../../../projects/angular-google-charts/src/public_api';
import { GoogleChartService } from '../services/google-chart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { loadTblRow } from '../Models/IsoModels';
import { DatePipe } from '@angular/common';
import { MinMaxDate } from '../Models/MiscModels';
import { LoadService } from '../services/load.service';
import { SignalrISOdataService } from '../services/signalr-ISOdata.service';
import { MiscService } from '../services/misc.service';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';


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

  constructor(private gChartService: GoogleChartService, private route: ActivatedRoute,
    private signalrService: SignalrISOdataService, private _ngZone: NgZone, private miscSvc: MiscService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', { 'packages': ['corechart', 'table', 'controls'] });
    this.gLib.charts.setOnLoadCallback(this.drawLoadChart.bind(this));
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

    seriesType: 'area',
    vAxis: { title: 'MwH' },
    hAxis: { title: 'Time' },
    colors: ['#ffb3ba'],
    legend: {
      position: 'none'
    },
    backgroundColor: '#f5f8fd',
    titleTextStyle: {
      color: 'black',    // any HTML string color ('red', '#cc00cc')
      fontName: 'Monteserrat', // i.e. 'Times New Roman'
      fontSize: 20, // 12, 18 whatever you want (don't specify px)
      bold: false,    // true or false
      italic: true   // true of false
    },
    chartArea: { width: '80%', height: '70%' },
  };
  // Show some columns directly from the underlying data.
  // Shows column 3 twice.
  //   view.setColumns([3, 4, 3, 2]);

  //   // Underlying table has a column specifying a value in centimeters.
  //   // The view imports this directly, and creates a calculated column
  //   // that converts the value into inches.
  //   view.setColumns([1, { calc: cmToInches, type:'number', label:'Height in Inches'}]);
  // function cmToInches(dataTable, rowNum) {
  //   return Math.floor(dataTable.getValue(rowNum, 1) / 2.54);
  // }
  private drawLoadChart(options) {


    // Create the dataset (DataTable)
    this.loadTable = new google.visualization.DataTable();
    this.loadTable.addColumn('date', 'Date');
    this.loadTable.addColumn('number', 'Load');

    for (let i = 0; i < this.chartData.length; i++) {
      var chartRow = new Array<Date | number | string>();
      chartRow.push(new Date(this.chartData[i].timestamp));
      chartRow.push(this.chartData[i].instantaneous_Load);
      this.loadTable.addRow(chartRow);
    }
    this.chartTitle = 'Load Data as of ' + new Date(this.chartData[this.chartData.length - 1].timestamp).toString();
    this.minMaxDate = this.miscSvc.GetMinMaxdate(this.chartData);
    // Create a dashboard.
    var dash_container = document.getElementById('dashboard_div');
    this.loadDashboard = new this.gLib.visualization.Dashboard(dash_container);


    // Create a date range slider
    var loadDateSlider = new this.gLib.visualization.ControlWrapper({
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
            backgroundColor: '#f5f8fd',
          },
        },

        //'state': { 'range': { 'start': new Date(this.minMaxDate.MinDate), 'end': new Date(this.minMaxDate.MinDate) } }
      }
    });
    var date_formatter = new google.visualization.DateFormat({
      pattern: "MMM dd, yyyy,  h:mm aa eee"
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
    this.loadDashboard.bind(loadDateSlider, this.loadLine);

    this.loadDashboard.draw(this.loadTable);
  }
  private updateLoadChart(data: loadTblRow) 
  {
    this.chartData.push(data);

    this.chartTitle = 'Load Data as of ' + new Date(data.timestamp).toString();

    var chartRow = new Array<Date | number | string>();
    chartRow.push(new Date(data.timestamp));
    chartRow.push(data.instantaneous_Load);

    if (this.loadDashboard != undefined) 
    {
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
}