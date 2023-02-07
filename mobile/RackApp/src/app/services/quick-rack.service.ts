import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NewRackPage } from '../tab2/new-rack/new-rack.page';

@Injectable({
  providedIn: 'root'
})
export class QuickRackService {

  constructor(private modalCtrl: ModalController, private toastController: ToastController) { }


  public async quickRack() {
    const modal = await this.modalCtrl.create({
      component: NewRackPage,
      // componentProps: {
      //   'item': item
      // }
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
    }

    if (role === 'save') {
      console.log('item added');
      const toast = await this.toastController.create({
        message: `${data} was successfully added to your Rack!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
    }
}

}
