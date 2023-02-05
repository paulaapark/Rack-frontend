import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController, AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
import { RackService } from 'src/app/services/rack.service';

import { Camera, CameraResultType } from '@capacitor/camera';
import { event } from 'jquery';

@Component({
  selector: 'app-new-rack',
  templateUrl: './new-rack.page.html',
  styleUrls: ['./new-rack.page.scss'],
})
export class NewRackPage {
  result!: string;

  rackForm:FormGroup;
  selectedImage:any;
  imageUrl:string|undefined = '';

  constructor(private modalCtrl: ModalController, 
    private alertController: AlertController, private actionSheetCtrl: ActionSheetController, 
    private formBuilder: FormBuilder, 
    private router:Router, 
    private route:ActivatedRoute,
    private rackService:RackService,
    public userService:UserService) {
    this.rackForm = formBuilder.group({
      Title: ['', [Validators.required]],
      Description: ['', ],
      Season: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      User_id: [this.userService.currentUser.id, [Validators.required]]
    })
   }


   async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'What image would you like to upload for this item?',
      // subHeader: 'A maximum of one image can be added per item',
      buttons: [
        {
          text: 'Upload from device',
          role: 'upload',
          data: {
            action: 'upload',
          },
        },
        {
          text: 'Take a new snapshot',
          role: 'capture',
          data: {
            action: 'capture',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    if (role === 'upload'){
      this.selectFile(event);
    }
    if (role === 'capture'){
      this.takePicture();
    }

  }

   selectFile(event: any): void {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage)
  }

   addRack(){
    let formValues = this.rackForm.value;
    let fd = new FormData();
    fd.append('image', this.selectedImage);

    for(let key in formValues){
      fd.append(key, formValues[key]);
    }

    this.rackService.newRack(fd).subscribe({
      next: (result) => {
        console.log(result);
        // alert('New item added!');
        // this.router.navigate(['../../tab2'], {relativeTo: this.route})
        return this.modalCtrl.dismiss(this.rackForm.value.Title, 'save');
      },
      error: error => {
        // alert('Unsuccessful');
        console.error(error);
        return this.modalCtrl.dismiss(null, 'error');
      }
    });
   }

   back() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  get User_idFormControl(){
    return this.rackForm.get('User_id')!;
  }

  get TitleFormControl(){
    return this.rackForm.get('Title')!;
  }

  get DescriptionFormControl(){
    return this.rackForm.get('Description')!;
  }

  get SeasonFormControl(){
    return this.rackForm.get('Season')!;
  }

  get TypeFormControl(){
    return this.rackForm.get('Type')!;
  }

  

  takePicture(){
      const snapPicture = async () => {
        const image = await Camera.getPhoto({
          quality: 100,
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

        console.log(this.imageUrl)
      };
      snapPicture();
    }
  
}
