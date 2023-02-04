import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm;

  constructor(private service:UserService, private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute) { 
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
          alert('Register successful!');
          this.router.navigate(['../login'], {relativeTo: this.route});
        }, 
        error: error => {
        alert('Register failed!');
        console.error(error);
        }
    });
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
