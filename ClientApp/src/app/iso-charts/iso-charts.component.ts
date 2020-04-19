import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-iso-charts',
  templateUrl: './iso-charts.component.html',
  styleUrls: ['./iso-charts.component.css'],
  styles: [':host > *:not(h1) { display: inline-block !important; }'],
})
export class IsoChartsComponent implements OnInit, OnDestroy {

  public destroyed = new Subject<any>();

  constructor() {
 
  }
  ngOnInit(): void {  

  }  

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
