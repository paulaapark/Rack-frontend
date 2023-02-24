import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { QuickRackService } from 'src/app/services/quick-rack.service';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';
import { CitiesComponent } from '../cities/cities.component';
import { Icity } from 'src/app/interfaces/icity';

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
  detailsFunction!:any;
  userDetails!:any;
  public user!:any;
  
  selectedImage:any;
  img1:any;

  public bUrl:string = this.userService.baseUrl;

  showEmailInput:boolean = false;
  showPwInput:boolean = false;
  securityEdit:boolean = false;

  emailForm:FormGroup;
  pwForm:FormGroup;

  lrForm:FormGroup;
  lrEdit:boolean = false;
  selectedCity!:any;
  term:string = '';
  cities!:any;
  selected:boolean=false;
  selCityId!:any;
  curCityId!:any;
  public curCity!:any;

  constructor(private router:Router, private service:QuickRackService, private userService:UserService, private formBuilder:FormBuilder, private http:HttpClient, private modalCtrl:ModalController) {
    this.detailsForm = formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: [''],
      Birthday: [''],
      Gender: ['', [Validators.required]]
    });

    this.emailForm = formBuilder.group({
      CurrentEmail: ['', [Validators.required]],
      NewEmail: ['', [Validators.required]]
    });

    this.pwForm = formBuilder.group({
      CurrentPw: ['', [Validators.required]],
      NewPw: ['', [Validators.required]]
    });

    this.lrForm = formBuilder.group({
      // Language: [''],
      City_id: ['', [Validators.required]]
    });

  }
    

  ngOnInit() {
    this.userService.getUserDetails().subscribe((res:any) => {
      this.userDetails = Object.values(res);
      this.user = this.userDetails[0];
      this.detailsForm.patchValue(this.user);

      if (this.user.City_id !== null){
      this.curCityId = this.user.City_id;
      this.getCurCity().subscribe((res:any) => {
        this.selectedCity = res;
      });
    };
  
    });

    

    this.accountSettings = false;
    this.edit = false;
  }
  
  ionViewWillEnter(): void {
    this.userService.getUserDetails().subscribe((res:any) => {
      this.userDetails = Object.values(res);
      this.user = this.userDetails[0];
      this.detailsForm.patchValue(this.user);

      if (this.user.City_id !== null){
        this.curCityId = this.user.City_id;
        this.getCurCity().subscribe((res:any) => {
          this.selectedCity = res;
        });
      };
    });
  }

  quickRack(){
    this.service.quickRack();
  }

  logout(){
    localStorage.removeItem("currentUser");
    location.reload();
    this.router.navigate(['startup']);
  }

  openAS(){
    this.accountSettings = true;
    
  }
  
  back(){
    this.accountSettings = false;
    this.edit = false;
  }

  cancel(){
    this.accountSettings = true;
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
    this.ionViewWillEnter();
  }

  editLR(){
    this.lrEdit = true;
  }

  cancelLR(){
    this.lrEdit = false;
  }

  submitLR(){
    let formValues = this.lrForm.value;
    let fd = new FormData();

    for(let key in formValues){
      fd.append(key, formValues[key]);
    }

    this.userService.userLREdit(fd).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: error => {
        console.error(error);
      }
    })
    console.log('save');
    this.lrEdit = false;
    this.ionViewWillEnter();
  }

  async citiesModal() {
    const modal = await this.modalCtrl.create({
      component: CitiesComponent,
    });

    modal.present();
    
    const { data, role } = await modal.onWillDismiss();

    if (role === 'cancel') {
      console.log('cancelled');
      this.selected = false;
    };

    if (role === 'selected') {
      console.log('city selected');
      this.selCityId = data;
      this.getSelCity().subscribe((res:any) => {
        this.selectedCity = res;
      });
    };
  }

  getSelCity(){
    return this.http.get(this.bUrl + 'cities/' + this.selCityId)
  }

  getCurCity(){
    return this.http.get(this.bUrl + 'cities/' + this.curCityId)
  }
  //Security Edits

  changeEmail(){
    this.showEmailInput=true;
    this.securityEdit=true;
  }

  changePw(){
    this.showPwInput =true;
    this.securityEdit=true;
  }

  cancelEmailEdit(){
    this.securityEdit = false;
    this.showEmailInput = false;
  }

  cancelPwEdit(){
    this.securityEdit = false;
    this.showPwInput = false;
  }

  submitEmailEdit(){
    let formValues = this.emailForm.value;
    let fd = new FormData();

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
    this.ionViewWillEnter();
  }

  submitPwEdit(){
    let formValues = this.pwForm.value;
    let fd = new FormData();

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
    this.ionViewWillEnter();
  }
  //Getters

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


  get CurrentEmailFormControl(){
    return this.detailsForm.get('CurrentEmail')!;
  }
  
  get NewEmailFormControl(){
    return this.detailsForm.get('NewEmail')!;
  }

  get CurrentPwFormControl(){
    return this.detailsForm.get('CurrentPw')!;
  }

  get NewPwFormControl(){
    return this.detailsForm.get('NewPw')!;
  }

  get LanguageFormControl(){
    return this.detailsForm.get('Language')!;
  }

  get RegionFormControl(){
    return this.detailsForm.get('City_id')!;
  }

}
