import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Icity } from 'src/app/interfaces/icity';
import { GetWeatherService } from 'src/app/services/get-weather.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {

  // selCityForm:FormGroup;
  cities:any;
  filterTerm:string = '';
  selCity!:Icity;
  city!:any;

  selectedValue: any;

  constructor(private weatherService:GetWeatherService, private modalCtrl: ModalController, private formBuilder:FormBuilder) { 
    // this.selCityForm = formBuilder.group({
    //   City:[Number]
    // });
  }

 
  
  ionViewWillEnter() {
    this.weatherService.getCity().subscribe((res:any) => {
      this.cities = Object.values(res);
    });
  }
  
  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  checkValue(event:any) { 
    this.selectedValue = event.detail.value;
  }
  submit(){
    return this.modalCtrl.dismiss(this.selectedValue, 'selected');
  }


  // get CityFormControl(){
  //   return this.selCityForm.get('City')!;
  // }
}
