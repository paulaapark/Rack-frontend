import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  // public currentUser:any = JSON.parse(localStorage.getItem('currentUser')!);

  constructor(private service:UserService, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute, private modalCtrl:ModalController, private toastController:ToastController) {
    this.loginForm = formBuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login() {
    let formData = this.loginForm.value;
    this.service.login(formData).subscribe({
      next: (result) => {
        localStorage.setItem('currentUser', JSON.stringify(result)); //Storing the data of the currently logged in user on the browser
        return this.modalCtrl.dismiss(null, 'success');
      }, error: error  => {
        console.error(error);
        this.presentToast();
        
      }  
    });
  }
  

  signup(){
    return this.modalCtrl.dismiss(null, 'signup');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect email or password',
      duration: 2500,
      position: 'bottom'
    });

    await toast.present();
  }

  get EmailFormControl(){
    return this.loginForm.get('Email')!;
  }

  get PasswordFormControl(){
    return this.loginForm.get('Password')!;
  }
}
