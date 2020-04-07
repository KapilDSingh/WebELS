import { Component, OnInit, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { MinMaxDate } from '../Models/MiscModels';
import { GoogleChartService } from '../services/google-chart.service';
import { ActivatedRoute } from '@angular/router';
import { SignalrISOdataService } from '../services/signalr-ISOdata.service';
import { MiscService } from '../services/misc.service';
import { takeUntil } from 'rxjs/operators';
import { lmpTblRow } from '../Models/IsoModels';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-lmpchart',
  templateUrl: './lmpchart.component.html',
  styleUrls: ['./lmpchart.component.css']
})
export class LmpChartComponent implements OnInit {

  private destroyed = new Subject<any>();
  private gLib: any;
  private minMaxDate: MinMaxDate;
  private LmpTable: any;
  private LmpDashboard: any;
  private chartTitle: string;
  private LmpLine: any;
  private LmpDateSlider: any;
  private width: number;
  private height: number;
  private controlOptions: any;
  private chartData = new Array<lmpTblRow>();

  constructor(private gChartService: GoogleChartService, private route: ActivatedRoute,
    private signalrService: SignalrISOdataService, private _ngZone: NgZone, private miscSvc: MiscService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', { 'packages': ['corechart', 'table', 'controls'] });
    this.gLib.charts.setOnLoadCallback(this.drawLmpChart.bind(this));
    route.params.pipe(
      takeUntil(this.destroyed)
    ).subscribe(val => {
      this.chartData = this.route.snapshot.data.LmpData;
    });
  }
  private options = {
    series: {
      0: {
        seriesType: 'line',
        color: 'black',
      }
    },

    vAxis: { title: '$/MwH', textStyle: { fontSize: '12' }, format: 'short' },
    hAxis: { textStyle: { fontSize: '12' }, format: 'MMMM d' },
    colors: ['black'],
    legend: {
      position: 'none'
    },

    titleTextStyle: {
      color: 'black',    // any HTML string color ('red', '#cc00cc')
      fontName: 'Open Sans', // i.e. 'Times New Roman'
      fontSize: '18', // 12, 18 whatever you want (don't specify px)
      bold: false,    // true or false
      italic: true,   // true of false
    },
    chartArea: { width: '80%', height: '70%' },
    crosshair: { trigger: 'both' },
    curveType: 'function',
    lineWidth: 1,
    lineColor: 'black',

  };
  setFilterOptions() {
    this.controlOptions = {
      // Filter by the date axis.
      'filterColumnIndex': 0,
      ui: {
        'chartType': 'lineChart',

        'chartOptions': {
          chartArea: { width: '80%', height: '90%' },
          hAxis: { textStyle: { fontSize: '12' }, format: 'MMMM d' },
          'color': 'black',
          'lineWidth': '1',
          opacity: 1,
        },
      },

      //     'state': { 'range': { 'start': this.minMaxDate.MinDate, 'end': this.minMaxDate.MaxDate } }
    }
  }

  ngOnInit() {
    this.chartData = this.route.snapshot.data.LmpData;

    this.signalrService.LMPmessageReceived
      .pipe(takeUntil(this.destroyed))
      .subscribe((data) => {
        this._ngZone.run(() => {
          this.updateLmpChart(data);
        });
      });
  }
  formatAxes() {
    const date_formatter = new google.visualization.DateFormat({ pattern: 'MMM dd, yyyy,  h:mm aa' });
    date_formatter.format(this.LmpTable, 0);  // Where 0 is the index of the column

    const formatter = new google.visualization.NumberFormat({ suffix: ' $/MWH', pattern: '#,###' });
    formatter.format(this.LmpTable, 1); // Apply formatter to second column
  }


  setConditionalFormat(day: number, chartRow: Array<Date | number | string | Boolean>): Array<Date | number | string | Boolean> {
    if (day > 0 && day < 6) {
      chartRow.push('color: red;');
      chartRow.push(true);
    } else {
      chartRow.push('color: black;');
      chartRow.push(false);
    }
    return chartRow;
  }


  private drawLmpChart(options) {
    // Create the dataset (DataTable)
    this.LmpTable = new google.visualization.DataTable();
    this.LmpTable.addColumn('date', 'Date');
    this.LmpTable.addColumn('number', 'Lmp');
    this.LmpTable.addColumn({ type: 'string', role: 'style' });
    this.LmpTable.addColumn({ type: 'boolean', role: 'certainty' });

    for (let i = 0; i < this.chartData.length; i++) {
      let chartRow = new Array<Date | number | string | Boolean>();
      const date = new Date(this.chartData[i].timestamp);

      chartRow.push(date);
      chartRow.push(this.chartData[i].fiveMinuteAvgLMP);

      const day = date.getDay();
      chartRow = this.setConditionalFormat(day, chartRow);

      this.LmpTable.addRow(chartRow);
    }
    this.chartTitle = 'LMP Data as of ' + new Date(this.chartData[this.chartData.length - 1].timestamp).toLocaleTimeString() + ' (EST)';

    this.minMaxDate = this.miscSvc.GetMinMaxdate(this.chartData);
    // Create a dashboard.
    const dash_container = document.getElementById('LMPdashboard_div');

    this.LmpDashboard = new this.gLib.visualization.Dashboard(dash_container);

    // Create a date range slider
    this.LmpDateSlider = new this.gLib.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'LMPcontrol_div',
    });
    this.setFilterOptions();
    this.LmpDateSlider.setOptions(this.controlOptions);

    this.formatAxes();

    // Line chart visualization
    this.LmpLine = new google.visualization.ChartWrapper({
      'chartType': 'ComboChart',
      'containerId': 'LMPline_div',

      'options': this.options,
    });
    this.LmpLine.setOption('title', this.chartTitle);
    // Bind LmpLine to the dashboard, and to the controls
    // this will make sure our line chart is updated when our date changes
    this.LmpDashboard.bind(this.LmpDateSlider, this.LmpLine);

    this.LmpDashboard.draw(this.LmpTable);
  }

  private updateLmpChart(data: lmpTblRow) {
    this.chartData.push(data);
    this.chartTitle = 'LMP Data as of ' + new Date(data.timestamp).toLocaleTimeString('en-US') + ' (EST)';

    let chartRow = new Array<Date | number | string | Boolean>();
    const date = new Date(data.timestamp);
    chartRow.push(date);
    chartRow.push(data.fiveMinuteAvgLMP);
    const day = date.getDay();

    if (this.LmpDashboard != undefined) {
      chartRow = this.setConditionalFormat(day, chartRow);
      this.LmpTable.addRow(chartRow);
      this.LmpLine.setOption('title', this.chartTitle);

      this.formatAxes();
      this.LmpDashboard.draw(this.LmpTable);
    }
  }
  onResized(event: ResizedEvent) {
    this.width = event.newWidth;
    this.height = event.newHeight;


    console.log('width', this.width);
    console.log('height', this.height);

    if (this.LmpLine != undefined) {
      this.LmpLine.draw();
      this.LmpDateSlider.draw();
    }

  }
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
