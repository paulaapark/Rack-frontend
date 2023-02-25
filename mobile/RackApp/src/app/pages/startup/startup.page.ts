import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SignupPage } from './signup/signup.page';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginPage } from './login/login.page';
import { DetailsPage } from '../details/details.page';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {
//  userId!:any;
userSignup!:any;
  constructor( private modalCtrl:ModalController, private toastController:ToastController, private router:Router, 
    private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
  }


  async signupModal() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      console.log('success');
      const toast = await this.toastController.create({
        message: `Welcome, ${data.FirstName}! Let's get acquainted!`,
        duration: 2500,
        position: 'bottom'
      });
      this.userSignup = data;
      console.log(this.userSignup);
      await toast.present();
      // this.firstLogin();
      this.detailsModal();
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

  async detailsModal() {
  
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: {
        'userSignup': this.userSignup
      }
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      console.log('success');
      const toast = await this.toastController.create({
        message: `Nice getting to know you! Please login to get started!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.loginModal(); 
    }

    if (role === 'error') {
      console.log('error');
      const toast = await this.toastController.create({
        message: `Sorry something went wrong. Let's revisit this later. Please log in to get started!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.loginModal();
    }

    if (role === 'later') {
      const toast = await this.toastController.create({
        message: `No worries, we can get acquainted later. Please login to get started!`,
        duration: 2500,
        position: 'bottom'
      });

      await toast.present();
      this.loginModal();
    }
  }


  async loginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      console.log('success');
      this.router.navigate(['../tabs'], {relativeTo: this.route});    
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

    if (role === 'signup') {
      this.signupModal();
    }
  }

}
