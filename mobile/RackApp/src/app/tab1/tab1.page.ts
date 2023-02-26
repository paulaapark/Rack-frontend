import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GetWeatherService } from '../services/get-weather.service';
import { HttpClient } from '@angular/common/http';
import { Iuser } from '../interfaces/iuser';

import { ForecastComponent } from '../components/forecast/forecast.component';

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

city_id!:any;

user!:Iuser;

inspoArray:string[] = ["Another day, another outfit!","Go get 'em!","Dress to impress!","Be your own icon!","Give 'em something to talk about!","Fake it 'til you make it!","Today is your day!","It's a great day to be you!","Show 'em who's boss!"];
inspoStr!:string;
  constructor(public userService:UserService, private router:Router, private route:ActivatedRoute, private weatherService:GetWeatherService, private http:HttpClient, private modalCtrl:ModalController) {
    if (this.hrs < 12){
      this.greeting = 'Good Morning';
    }else if ( this.hrs >= 12 && this.hrs <=17){
      this.greeting = 'Good Afternoon';
    }else{
      this.greeting = 'Good Evening';
    };
  }

  ngOnInit() {
    if (this.hrs > 0){
      this.getInspo();
    }
  }


  getInspo(){
      this.inspoStr = this.inspoArray[Math.floor(Math.random() * this.inspoArray.length)];
    }
  

  ionViewWillEnter() {
    this.userService.getUserDetails().subscribe((res:any) => {
      this.userDetails = Object.values(res);
      this.city_id = this.userDetails[0].City_id;
      if (this.city_id !== undefined){
        this.getMCurrent().subscribe((res:any) => {
          this.currentWeather = res;
        });
      }
    });
    
  }

  stats(){
    this.router.navigate(['stats'], {relativeTo: this.route});
  }

  async forecast(){
    const modal = await this.modalCtrl.create({
      component: ForecastComponent,
    });

    modal.present();
    // console.log(item);
    const { data, role } = await modal.onWillDismiss();

    if (role === 'back') {
      console.log('back');
      
    }

  }


  getMCurrent(){
    return this.http.get(this.weatherService.weatherUrl + this.city_id + this.weatherService.apiKeyUrl + this.weatherService.metricUrl);
  };
  
}
