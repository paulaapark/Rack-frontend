import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RackService } from 'src/app/services/rack.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})


export class ItemDetailsComponent implements OnInit {
  defaultView!:boolean;
  editView!:boolean;

  handlerMessage = '';
  roleMessage = '';

  itemForm:FormGroup;
  itemURL!:string;

  selectedImage:any;

  img1:any;

  public bUrl:string = this.userService.baseUrl;

  @Input() item:any;

  constructor(private modalCtrl: ModalController, 
    private alertController: AlertController, 
    private actionSheetCtrl: ActionSheetController, private http:HttpClient, private service:RackService, private userService:UserService,
    private router:Router, private route:ActivatedRoute, private formBuilder: FormBuilder) {

      this.itemForm = formBuilder.group({
      Title: [''],
      Description: [''],
      Season: [''],
      Item_type: ['']
    });

  }

  ngOnInit() {
    this.defaultView=true;
    this.editView=false;
    console.log(this.item);
    this.itemForm.patchValue(this.item);

    this.itemURL = this.service.rackUrl + '/' + this.item.id;
  }

  back() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  cancel(){
    this.defaultView=true;
    this.editView=false;
    console.log('cancel edit')
  }

  edit() {
    console.log('edit');
    this.defaultView = false;
    this.editView = true;
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

  remove(){
    this.img1 = undefined;
    $('#selectFile').val('');
    
  }
  
  save() {
    let formValues = this.itemForm.value;
    let fd = new FormData();

    fd.append('image', this.selectedImage);

    for(let key in formValues){
      fd.append(key, formValues[key]);
    }

    this.editItem(fd).subscribe({
      next: (result) => {
        console.log(result);
        return this.modalCtrl.dismiss(this.itemForm.value.Title, 'save');
      },
      error: error => {
        alert('Unsuccessful');
        console.error(error);
        return this.modalCtrl.dismiss(null, 'error');
      }
    })
    console.log('save');
    
  }


  async presentAlert() {
    console.log(this.item.id);
    const alert = await this.alertController.create({
      header: 'Permanently delete from your Rack?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'delete',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(role);
    if (role === 'delete'){
      this.deleteItem().subscribe({
        next: (result) => {
          return this.modalCtrl.dismiss(this.item.Title, 'delete');
        }
        });
    }

  }

  deleteItem(){
    return this.http.delete(this.itemURL);
  }

  editItem(formData:object){
    return this.http.patch(this.itemURL, formData);
  }

  get TitleFormControl(){
    return this.itemForm.get('Title')!;
  }

  get DescriptionFormControl(){
    return this.itemForm.get('Description')!;
  }

  get SeasonFormControl(){
    return this.itemForm.get('Season')!;
  }

  get TypeFormControl(){
    return this.itemForm.get('Item_type')!;
  }
}
