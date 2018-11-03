import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { LMP } from '../Models/IsoModels';
import { environment } from '../../environments/environment';

@Injectable()
export class SignalrISOdataService implements OnInit {
  messageReceived = new EventEmitter<Array<LMP>>();
  connectionEstablished = new EventEmitter<Boolean>();

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

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .build();
  }

  private startConnection(): void {
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
      this.messageReceived.emit(data);
    });
  }
  ngOnInit(): void {

  }
}



