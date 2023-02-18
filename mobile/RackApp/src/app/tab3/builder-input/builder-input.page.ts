import { Component, OnInit } from '@angular/core';
import { RackService } from 'src/app/services/rack.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { ModalController, ToastController } from '@ionic/angular';
import { ItemDetailsComponent } from 'src/app/components/item-details/item-details.component';
import { delay } from 'rxjs';


@Component({
  selector: 'app-builder-input',
  templateUrl: './builder-input.page.html',
  styleUrls: ['./builder-input.page.scss'],
})
export class BuilderInputPage implements OnInit {
  public builder!: boolean;
  public loading!: boolean;
  public results: boolean = false;
  public myDate = new Date();
  public hrs = this.myDate.getHours();
  public timeOfDay: string;
  public userRack: any;
  public filteredRack: any = [];
  public filteredRackArray: any = [];

  generatedItem: any;
  public generatedItems: any = [];
  builderForm;
  filterQuery: any;
  filterQueryArray: any;

  seasons: any = [];
  item_types: any = [];
  item!: any;
  itemArray!: any;
  formData!: object;
  strItem!: any;

  min:number = 3;
  max:number = 7;
  rand:number = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);

  loadingArray= ["Looking through your closet","Digging through the piles", "Checking behind the drawers","Sorting through the options"];
  loadingShuffled!:string[];
  public loadingString!:string;

  yay:boolean = false;
  nay:boolean = false;

  matches:string = 'matches';
  requests:string = 'requests';

  public bUrl:string = this.userService.baseUrl;
  
  constructor(public userService: UserService, public rackService: RackService, private formBuilder: FormBuilder, private http: HttpClient, private modalCtrl:ModalController, private toastController:ToastController) {
    if (this.hrs < 12) {
      this.timeOfDay = 'morning';
    } else if (this.hrs >= 12 && this.hrs <= 17) {
      this.timeOfDay = 'afternoon';
    } else {
      this.timeOfDay = 'evening';
    };

    this.builderForm = formBuilder.group({
      items: this.formBuilder.array([
        this.itemInit(),
      ])
    });
  }

  ngOnInit() {
    this.builder = true;
    this.loading = false;

  }


  itemInit() {
    return this.formBuilder.group({
      Season: ['', [Validators.required]],
      Item_type: ['', [Validators.required]],
    })
  }

  addItem() {
    const control = <FormArray>this.builderForm.controls['items'];
    control.push(this.itemInit());
  }

  deleteItem(i: number) {
    const control = <FormArray>this.builderForm.controls['items'];
    control.removeAt(i);
  }

  async onSubmit() {
    this.builder = false;
    this.loading = true;
    this.formData = this.builderForm.value;
    this.itemArray = this.builderForm.value.items;


    for (let i = 0; i < this.itemArray.length; i++) {
      if (this.itemArray[i].Season.length > 1) {
        let multiSeason = this.itemArray[i].Season.join("");
        this.seasons.push(multiSeason);
      }
      else if (this.itemArray[i].Season.length = 1) {
        this.seasons.push(this.itemArray[i].Season);
      };
      if (this.itemArray[i].Item_type.length > 1) {
        let multiType = this.itemArray[i].Item_type.join("");
        this.item_types.push(multiType);
      }
      else if (this.itemArray[i].Item_type.length = 1) {
        this.item_types.push(this.itemArray[i].Item_type);
      };
    }
    //merging the queries per item for the same i
    this.filterQueryArray = this.seasons.map((e: any, i: number) => e + this.item_types[i]);

    // console.log(this.filterQueryArray);

    for (let i = 0; i < this.filterQueryArray.length; i++) {
      this.filterQuery = this.filterQueryArray[i];  //this is working in the getFilter http get function
      this.getFilter().subscribe((res: any) => {
        this.filteredRack = Object.values(res);
        this.filteredRackArray.push(this.filteredRack);

        if (this.filteredRack.length > 1) {
          this.generatedItem = this.filteredRack[Math.floor(Math.random() * this.filteredRack.length)];
          this.generatedItems.push(this.generatedItem);
        }
        else if (this.filteredRack.length == 1) {
          this.generatedItems.push(this.filteredRack[0]);
        };

      });
    }

    this.shuffleLoading();

    console.log(this.filteredRackArray);
    console.log(this.generatedItems);

    setTimeout(() => {this.showResults()}, this.rand*1000);

  }


  getFilter() {
    return this.http.get(this.rackService.userUrl + this.filterQuery);
  };

  pause(number:number) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, number);
    })
}

  async shuffleLoading(){
    for (let i=0; i < this.loadingArray.length; i++) {
      this.loadingString = this.loadingArray[Math.floor(Math.random() * this.loadingArray.length)];
      await this.pause(1355);
    }
  }
  
  showResults(){
    this.loading = false;
    this.results = true;
    if (this.filterQueryArray.length == this.generatedItems.length){
      this.yay = true;
    }
    else {
      this.nay = true;
      if (this.filterQueryArray.length - this.generatedItems.length == 1){
        this.matches = "a match";
        this.requests = "request";
      };
    }
    
  };

  restart(){
    this.builderForm.reset();
    this.builder = true;
    this.results = false;
    // clear the form array on restarting? only 1 item
  }

  async openModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsComponent,
      componentProps: {
        'item': item
      }
    });

    modal.present();
    // console.log(item);
    const { data, role } = await modal.onWillDismiss();

    if (role === 'delete') {
      console.log('deleted');
      const toast = await this.toastController.create({
        message: `${data} successfully deleted`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
    }

    if (role === 'save') {
      console.log('item updated');
      const toast = await this.toastController.create({
        message: `${data} successfully updated!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
    }

    if (role === 'error') {
      console.log('error');
      const toast = await this.toastController.create({
        message: `Sorry, something went wrong. Please try again.`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
    }
  }
}
