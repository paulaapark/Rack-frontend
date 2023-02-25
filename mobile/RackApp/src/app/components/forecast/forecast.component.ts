import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}


  back(){
    return this.modalCtrl.dismiss(null, 'back');
  }
}
