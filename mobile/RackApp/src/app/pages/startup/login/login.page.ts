import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm;

  constructor(private service:UserService, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute) {
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
        this.router.navigate(['../../tabs'], {relativeTo: this.route});
      }, error: error  => {
        alert('Incorrect email/password');
        console.error(error);
      }  
    });
  }


  get EmailFormControl(){
    return this.loginForm.get('Email')!;
  }

  get PasswordFormControl(){
    return this.loginForm.get('Password')!;
  }
}
