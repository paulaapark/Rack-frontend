import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RackService } from 'src/app/services/rack.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})


export class ItemDetailsComponent implements OnInit {
  defaultView!:boolean;
  editView!:boolean;

  imageUrl:string|undefined = '';

  handlerMessage = '';
  roleMessage = '';

  itemForm:FormGroup;
  itemURL!:string;

  @Input() item:any;

  constructor(private modalCtrl: ModalController, 
    private alertController: AlertController, 
    private actionSheetCtrl: ActionSheetController, private http:HttpClient, private service:RackService,
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

    this.itemURL = this.service.baseURL + '/' + this.item.id;
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

  

  save() {
    let formData = this.itemForm.value;
    this.editItem(formData).subscribe({
      next: (result) => {
        console.log(result);
        alert('Item edited');
      },
      error: error => {
        alert('Unsuccessful');
        console.error(error);
      }
    })
    console.log('save');
    // return this.modalCtrl.dismiss(this.name, 'confirm');
    return this.modalCtrl.dismiss(this.item.Title, 'save');
    // load & apply changes, toast successful item update
    
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
    return this.http.delete(this.itemURL)
  }

  editItem(formData:object){
    return this.http.patch(this.itemURL, formData)
  }

  takePicture(){
    const snapPicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.imageUrl = image.webPath;
    
      // Can be set to the src of an image now
      // imageElement.src = imageUrl;
      // alert(imageUrl);
    };
    snapPicture();
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
