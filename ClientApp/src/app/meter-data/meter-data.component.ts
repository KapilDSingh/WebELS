import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meter-data',
  templateUrl: './meter-data.component.html',
  styleUrls: ['./meter-data.component.css']
})
export class MeterDataComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>('http://summary.ekmmetering.com/summary?meters=17507&key=MTAxMDoyMDIw&format=json&report=15&limit=1&fields=kWh_Tot*').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

}
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

 

