import { Component, ViewChild, OnInit } from '@angular/core';
import { RackService } from '../services/rack.service';
import { HttpClient } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { ItemDetailsComponent } from '../components/item-details/item-details.component';
import { NewRackPage } from './new-rack/new-rack.page';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  filterTerm: string = '';
  userRack: any;
  public show: boolean = false;
  
  mainRackFunction: any;
  selection!: any;
  strSel!: any;

  gridToggle!:any;

  notGrid!: boolean;
  seasons = [];
  item_types = [];

  public bUrl:string = this.userService.baseUrl;
  public imgUrl:any;

  constructor(public service: RackService, private http: HttpClient,
    private modalCtrl: ModalController, private toastController: ToastController, private userService: UserService, private router:Router, private route:ActivatedRoute) {
          
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
      this.ionViewWillEnter();
    }

    if (role === 'save') {
      console.log('item updated');
      this.router.navigate(['../tabs/tab2']);
      const toast = await this.toastController.create({
        message: `${data} successfully updated!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.ionViewWillEnter();
      
    }

    if (role === 'error') {
      console.log('error');
      const toast = await this.toastController.create({
        message: `Sorry, something went wrong. Please try again.`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.ionViewWillEnter();
    }
  }

  async newRack() {
    const modal = await this.modalCtrl.create({
      component: NewRackPage,
    });

    modal.present();
    // console.log(item);
    const { data, role } = await modal.onWillDismiss();

    if (role === 'error') {
      console.log('error');
      const toast = await this.toastController.create({
        message: `Sorry, something went wrong. Please try again.`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.ionViewWillEnter();
    }

    if (role === 'save') {
      console.log('item added');
      const toast = await this.toastController.create({
        message: `${data} was successfully added to your Rack!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.ionViewWillEnter();
    }

    
  }



  handleChange() {
    this.selection = this.seasons.concat(this.item_types);
    this.strSel = this.selection.join("");

    if (this.selection.length > 0) {
      this.getFilter().subscribe((res: any) => {
        this.userRack = Object.values(res);
      });
    }
    else {
      this.mainRackFunction = this.service.getUserRack();
      this.mainRackFunction.subscribe((res: any) => {
        this.userRack = Object.values(res);
      });
    }
  }

  handleSChange(e: any) {
    this.seasons = (e.detail.value);
    this.handleChange();
  }

  handleTChange(e: any) {
    this.item_types = (e.detail.value);
    this.handleChange();
  }

  ionViewWillEnter():void {
    this.mainRackFunction = this.service.getUserRack();
    this.mainRackFunction.subscribe((res: any) => {
      this.userRack = Object.values(res);
    });

    this.gridToggle = true;
  }

  toggle() {
    this.show = !this.show;
  }

  getFilter() {
    return this.http.get(this.service.userUrl + this.strSel);
  }

  gridButton(){
    this.gridToggle = !this.gridToggle;
  }

}

