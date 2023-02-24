import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GetWeatherService } from 'src/app/services/get-weather.service';
import { HttpClient } from '@angular/common/http';

import { CitiesComponent } from 'src/app/components/cities/cities.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

  detailsForm:FormGroup;
  selectedImage:any;
  img1:any;
  public bUrl:string = this.service.baseUrl;

  selectedCity!:any;
  term:string = '';
  cities!:any;
  selected:boolean=false;
  selCityId!:any;

  constructor(private service:UserService, private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute, private modalCtrl:ModalController, private weatherService:GetWeatherService, private http:HttpClient) { 
    this.detailsForm = formBuilder.group({
      Birthday: [''],
      Gender: [''],
      City_id: ['']
    });
  }

  ionViewWillEnter(): void {
    this.selected = false;
  }


  async citiesModal() {
    const modal = await this.modalCtrl.create({
      component: CitiesComponent,
    });

    modal.present();
    
    const { data, role } = await modal.onWillDismiss();

    if (role === 'cancel') {
      console.log('cancelled');
      this.selected = false;
    };

    if (role === 'selected') {
      console.log('city selected');
      this.selCityId = data;
      this.getSelCity().subscribe((res:any) => {
        this.selectedCity = res;
      });
    };
  }


  details() {
    let formValues = this.detailsForm.value;
    let fd = new FormData();

    fd.append('image', this.selectedImage);

    for(let key in formValues){
      fd.append(key, formValues[key]);
    }

    this.service.userEdit(fd).subscribe({
      next: (result) => {
        console.log(result);
        return this.modalCtrl.dismiss(null, 'save');
      },
      error: error => {
        console.error(error);
        return this.modalCtrl.dismiss(null, 'error');
      }
    });
    console.log('save');

    // let formData = this.detailsForm.value;
    // this.service.userEdit(formData).subscribe({
    //     next: (result) => {
    //       console.log(result);
    //       return this.modalCtrl.dismiss(null, 'success');
    //     }, 
    //     error: error => {
    //       console.error(error);
    //       return this.modalCtrl.dismiss(null, 'error');
    //     }
    // });
  }

  later(){
    return this.modalCtrl.dismiss(null, 'later');
  }

  selectFile(event: any): void {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.img1 = event.target.result;
    }

    reader.readAsDataURL(this.selectedImage);
  
  }

  get BirthdayFormControl(){
    return this.detailsForm.get('Birthday')!;
  }

  get GenderFormControl(){
    return this.detailsForm.get('Gender')!;
  }
  get City_idFormControl(){
    return this.detailsForm.get('City_id')!;
  }
  

  getSelCity(){
    return this.http.get(this.bUrl + 'cities/' + this.selCityId)
  }
}

