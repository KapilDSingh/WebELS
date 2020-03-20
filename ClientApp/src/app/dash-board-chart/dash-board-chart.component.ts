import { Component, OnInit } from '@angular/core';
import { GoogleChartService } from  '../services/google-chart.service';

@Component({
  selector: 'app-dash-board-chart',
  templateUrl: './dash-board-chart.component.html',
  styleUrls: ['./dash-board-chart.component.css']
})
export class DashBoardChartComponent implements OnInit {

  private gLib: any;

  constructor(private gChartService : GoogleChartService) { 
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {'packages':['corechart','table', 'controls']});
    this.gLib.charts.setOnLoadCallback(this.drawDashboard.bind(this));
  }
  ngOnInit() {
  }
  private drawDashboard() {

    // Create our data table.
    var data = google.visualization.arrayToDataTable([
      ['Name', 'Donuts eaten'],
      ['Michael' , 5],
      ['Elisa', 7],
      ['Robert', 3],
      ['John', 2],
      ['Jessica', 6],
      ['Aaron', 1],
      ['Margareth', 8]
    ]);

    // Create a dashboard.
    var dashboard = new this.gLib.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // Create a range slider, passing some options
    var donutRangeSlider = new this.gLib.visualization.ControlWrapper({
      'controlType': 'NumberRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnLabel': 'Donuts eaten'
      }
    });

    // Create a pie chart, passing some options
    var pieChart = new google.visualization.ChartWrapper({
      'chartType': 'PieChart',
      'containerId': 'chart_div',
      'options': {
        'width': 300,
        'height': 300,
        'pieSliceText': 'value',
        'legend': 'right'
      }
    });

    // Establish dependencies, declaring that 'filter' drives 'pieChart',
    // so that the pie chart will only display entries that are let through
    // given the chosen slider range.
    dashboard.bind(donutRangeSlider, pieChart);

    // Draw the dashboard.
    dashboard.draw(data);
    var dashboard = new this.gLib.visualization.Dashboard(
      document.getElementById('dashboard'));

  var control = new this.gLib.visualization.ControlWrapper({
    'controlType': 'ChartRangeFilter',
    'containerId': 'control',
    'options': {
      // Filter by the date axis.
      'filterColumnIndex': 0,
      'ui': {
        'chartType': 'LineChart',
        'chartOptions': {
          'chartArea': {'width': '90%'},
            'hAxis': {'baselineColor': 'none', format: "dd.MM.yyyy" }
        },
        // Display a single series that shows the closing value of the stock.
        // Thus, this view has two columns: the date (axis) and the stock value (line series).
        'chartView': {
          'columns': [0, 3]
        },
        // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
        'minRangeSize': 86400000
      }
    },
    // Initial range: 2012-02-09 to 2012-03-20.
    'state': {'range': {'start': new Date(2012, 1, 9), 'end': new Date(2012, 2, 20)}}
  });

  var chart = new google.visualization.ChartWrapper({
    'chartType': 'CandlestickChart',
    'containerId': 'chart',
    'options': {
      // Use the same chart area width as the control for axis alignment.
      'chartArea': {'height': '80%', 'width': '90%'},
      'hAxis': {'slantedText': false},
      'vAxis': {'viewWindow': {'min': 0, 'max': 2000}},
      'legend': {'position': 'none'}
    },
    // Convert the first column from 'date' to 'string'.
    'view': {
      'columns': [
        {
          'calc': function(dataTable, rowIndex) {
            return dataTable.getFormattedValue(rowIndex, 0);
          },
          'type': 'string'
        }, 1, 2, 3, 4]
    }
  });

  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Stock low');
  data.addColumn('number', 'Stock open');
  data.addColumn('number', 'Stock close');
  data.addColumn('number', 'Stock high');

 
  // Create random stock values, just like it works in reality.
  var open, close = 300;
  var low, high;
  for (var day = 1; day < 121; ++day) {
    var change = (Math.sin(day / 2.5 + Math.PI) + Math.sin(day / 3) - Math.cos(day * 0.7)) * 150;
    change = change >= 0 ? change + 10 : change - 10;
    open = close;
    close = Math.max(50, open + change);
    low = Math.min(open, close) - (Math.cos(day * 1.7) + 1) * 15;
    low = Math.max(0, low);
    high = Math.max(open, close) + (Math.cos(day * 1.3) + 1) * 15;
    var date = new Date(2012, 0 ,day);
    data.addRow([date, Math.round(low), Math.round(open), Math.round(close), Math.round(high)]);
  }

 /* Change the format of the date column, used in chart, but not chart range filter */  
 var formatter = new google.visualization.DateFormat({pattern: "dd.MM.yyyy"});
 formatter.format(data, 0);

 
  dashboard.bind(control, chart);
  dashboard.draw(data);
}

  }


