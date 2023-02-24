import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { GetWeatherService } from '../services/get-weather.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
public myDate = new Date();
public hrs = this.myDate.getHours();
greeting:string;
userDetails!:any;
currentWeather:any;

iconUrl:string = 'http://openweathermap.org/img/wn/';
iconSUrl:string = '.png'

snow!:boolean;

inspoArray:String[] = ["Another day, another outfit!", "Go get 'em!", "Dress to impress", "Be your own icon", "Give 'em something to talk about", "Fake it 'til you make it", "Today is your day!", "It's a great day to be you!", "Show 'em who's boss!"];
inspoStr!:string;
  constructor(public userService:UserService, private router:Router, private route:ActivatedRoute, private weatherService:GetWeatherService) {
    if (this.hrs < 12){
      this.greeting = 'Good Morning';
    }else if ( this.hrs >= 12 && this.hrs <=17){
      this.greeting = 'Good Afternoon';
    }else{
      this.greeting = 'Good Evening';
    };

    if (this.hrs = 0){
      
    }
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.userService.getUserDetails().subscribe((res:any) => {
      this.userDetails = Object.values(res);
    });

    this.weatherService.getMCurrent().subscribe((res:any) => {
      this.currentWeather = res;
    });
  }

  stats(){
    this.router.navigate(['stats'], {relativeTo: this.route});
  }

  forecast(){

  }
}
