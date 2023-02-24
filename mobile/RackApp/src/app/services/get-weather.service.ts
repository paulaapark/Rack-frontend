import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icity } from '../interfaces/icity';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class GetWeatherService {
weatherUrl:string = 'https://api.openweathermap.org/data/2.5/weather?id=';
metricUrl:string = '&units=metric';
impUrl:string = '&units=imperial';
forecastUrl:string= 'https://api.openweathermap.org/data/2.5/forecast?id=';
city_id:number = 6167865;
apiKeyUrl:string = '&appid=4c926c7d32e2c3aae4ec15c426ad4f89';

  constructor(private http:HttpClient, private service:UserService) { }

  getMCurrent(){
    return this.http.get(this.weatherUrl + this.city_id + this.apiKeyUrl + this.metricUrl);
  };

  getICurrent(){
    return this.http.get(this.weatherUrl + this.city_id + this.apiKeyUrl + this.impUrl);
  };
  
  getMForecast(){
    return this.http.get(this.forecastUrl + this.city_id + this.apiKeyUrl + this.metricUrl);
  };

  getIForecast(){
    return this.http.get(this.forecastUrl + this.city_id + this.apiKeyUrl + this.impUrl);
  };


  getCity(){
    return this.http.get<Icity>(this.service.baseUrl + 'cities')
  };

  
}


