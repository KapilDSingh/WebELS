import { EventEmitter, Injectable, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { LMP } from '../Models/IsoModels';
import { environment } from '../../environments/environment';
import { loadTblRow } from '../Models/IsoModels';

@Injectable()
export class SignalrISOdataService implements OnInit, OnChanges  {
  connectionEstablished = new EventEmitter<Boolean>();
  
  LMPmessageReceived = new EventEmitter<Array<LMP>>();
  
  LoadmessageReceived = new EventEmitter<Array<loadTblRow>>();

  public connectionIsEstablished = false;
  public _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  public  sendLMPData(n: any ) {
    this._hubConnection.invoke('SendLMP', n);
  }
  public  sendLoadData(n: any ) {
    this._hubConnection.invoke('SendLoad', n);
  }
  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .build();
  }

  private startConnection(): any {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveLMP', (data: any) => {
      this.LMPmessageReceived.emit(data);
    });
    this._hubConnection.on('ReceiveLoad', (data: any) => {
      this.LoadmessageReceived.emit(data);
    });
  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      
    }
  }
}



