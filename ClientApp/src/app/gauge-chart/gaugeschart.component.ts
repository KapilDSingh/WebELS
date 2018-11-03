import { Component, Input, OnInit } from '@angular/core';


import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SignalrISOdataService } from '../services/signalr-ISOdata.service';
import { HubConnection } from '@aspnet/signalr';
declare var google: any;


@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gaugeschart.component.html'
})

export class GaugesChartComponent implements OnInit, OnChanges {

  
  // constructor(private _gaugesChartService: GoogleGaugesChartService) { }
 constructor( private _SignalRSvc: SignalrISOdataService) { }

   public _hubConnection: HubConnection;
   public _connectionIsEstablished = false;

  
   /* Only chart data !!!!!!! */
   ngOnChanges(changes) {
     if (changes.data !== undefined) {
     }
   }
  
   ngOnInit(): void {
      
   }
}
