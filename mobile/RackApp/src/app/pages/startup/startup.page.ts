import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SignupPage } from './signup/signup.page';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginPage } from './login/login.page';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {

  constructor( private modalCtrl:ModalController, private toastController:ToastController, private router:Router, 
    private route:ActivatedRoute,) { }

  ngOnInit() {
  }


  async signupModal() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
    });

    modal.present();
    // console.log(item);
    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      console.log('item updated');
      const toast = await this.toastController.create({
        message: `Welcome, ${data}! Please log in to get started.`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.loginModal();
    }

    if (role === 'error') {
      console.log('error');
      const toast = await this.toastController.create({
        message: `Sorry, something went wrong. Please try signing up again.`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
    }

    if (role === 'login') {
      this.loginModal();
    }
  }


  async loginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });

    modal.present();
    // console.log(item);
    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      console.log('success');
      // const toast = await this.toastController.create({
      //   message: `Welcome, ${data}! Please log in to get started.`,
      //   duration: 2500,
      //   position: 'bottom'
      // });

      // await toast.present();
      this.router.navigate(['../tabs'], {relativeTo: this.route});    }

    if (role === 'error') {
      console.log('error');
      const toast = await this.toastController.create({
        message: `Sorry, something went wrong. Please try signing up again.`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
    }

    if (role === 'signup') {
      this.signupModal();
    }
  }

}
