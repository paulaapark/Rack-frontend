import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';
import { RackService } from 'src/app/services/rack.service';

import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-new-rack',
  templateUrl: './new-rack.page.html',
  styleUrls: ['./new-rack.page.scss'],
})
export class NewRackPage {

  rackForm:FormGroup;

  imageUrl:string|undefined = '';

  constructor(private actionSheetCtrl: ActionSheetController, 
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
      Image: ['', ],
      User_id: [this.userService.currentUser.id, [Validators.required]]
    })
   }

   newRack(){
    let formData = this.rackForm.value;
    this.rackService.newRack(formData).subscribe({
      next: (result) => {
        console.log(result);
        alert('New item added!');
        this.router.navigate(['../../tab2'], {relativeTo: this.route})
      },
      error: error => {
        alert('Unsuccessful');
        console.error(error);
      }
    });
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
  
}
