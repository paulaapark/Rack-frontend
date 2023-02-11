import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm;

  constructor(private service:UserService, private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute, private toastController:ToastController, private modalCtrl:ModalController) { 
    this.signupForm = formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      // confPass: ['', [Validators.required]], this doesnt work with db somehow
    });
  }

  ngOnInit(): void {
  }

  signup() {
    let formData = this.signupForm.value;
    this.service.signup(formData).subscribe({
        next: (result) => {
          console.log(result);
          // alert('Register successful!');
          return this.modalCtrl.dismiss(this.signupForm.value.FirstName, 'success');  
          
        }, 
        error: error => {
        // alert('Register failed!');
        console.error(error);
        return this.modalCtrl.dismiss(null, 'error');
        }
    });
  }

  login(){
    return this.modalCtrl.dismiss(null, 'login');
  }

  back() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  get FirstNameFormControl(){
    return this.signupForm.get('FirstName')!;
  }

  get LastNameFormControl(){
    return this.signupForm.get('LastName')!;
  }
  get EmailFormControl(){
    return this.signupForm.get('Email')!;
  }

  get PasswordFormControl(){
    return this.signupForm.get('Password')!;
  }

  get confPassFormControl(){
    return this.signupForm.get('confPass')!;
  }



}
