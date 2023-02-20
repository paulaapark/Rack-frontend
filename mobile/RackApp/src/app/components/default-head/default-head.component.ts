import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Irack } from 'src/app/interfaces/irack';
import { Iuser } from 'src/app/interfaces/iuser';
import { QuickRackService } from 'src/app/services/quick-rack.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-default-head',
  templateUrl: './default-head.component.html',
  styleUrls: ['./default-head.component.scss'],
})
export class DefaultHeadComponent implements OnInit{
  detailsForm:FormGroup;
  accountSettings!:boolean;
  edit!:boolean;
  currentUser = this.userService.currentUser;
  details!:any;
  userDetails!:any;

  selectedImage:any;
  img1:any;

  public bUrl:string = this.userService.baseUrl;

  constructor(private router:Router, private service:QuickRackService, private userService:UserService, private formBuilder:FormBuilder, private http:HttpClient) {
    this.detailsForm = formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: [''],
      Birthday: [''],
      Gender: ['', [Validators.required]]
    });
  }
    

  ngOnInit():void{
    this.userService.getUserDetails().subscribe((res: any) => {
      this.userDetails = Object.values(res);
    });

    this.detailsForm.patchValue(this.userService.currentUser);

    this.accountSettings = false;
    this.edit = false;
  }
  
  ionViewWillEnter(): void {

    
    
    

    this.accountSettings = false;
    this.edit = false;
    
  }

  quickRack(){
    this.service.quickRack();
  }

  logout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['startup']);
  }

  openAS(){
    this.accountSettings = true;
  }
  
  back(){
    this.accountSettings = false;
    this.edit = false;
  }

  editDetails(){
    this.edit = true;
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

  submitEdit(){
    let formValues = this.detailsForm.value;
    let fd = new FormData();

    fd.append('image', this.selectedImage);

    for(let key in formValues){
      fd.append(key, formValues[key]);
    }

    this.userService.userEdit(fd).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: error => {
        console.error(error);
      }
    })
    console.log('save');
    this.edit = false;
  }


  get FirstNameFormControl(){
    return this.detailsForm.get('FirstName')!;
  }

  get LastNameFormControl(){
    return this.detailsForm.get('LastName')!;
  }

  get BirthdayFormControl(){
    return this.detailsForm.get('Birthday')!;
  }

  get GenderFormControl(){
    return this.detailsForm.get('Gender')!;
  }

  // getUserDetails(){
  //   let userUrl = this.userService.baseUrl + 'users/' + this.userService.currentUser.id;
  //   return this.http.get(userUrl);
  // }

  onClick(event:any){
    // let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    // systemDark.addListener(this.colorTest);
    // if(event.detail.value == 'dark'){
    //   document.body.setAttribute('data-theme', 'dark');
    // }
    // if(event.detail.value == 'light'){
    //   document.body.setAttribute('data-theme', 'light');
    // }
    // else{
    //   document.body.setAttribute('data-theme', 'light');
    // }
  }

  //  colorTest(systemInitiatedDark) {
  //   if (systemInitiatedDark.matches) {
  //     document.body.setAttribute('data-theme', 'dark');		
  //   } else {
  //     document.body.setAttribute('data-theme', 'light');
  //   }
  // }
}
