import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController, AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
import { RackService } from 'src/app/services/rack.service';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { Platform } from '@ionic/angular';

import * as $ from 'jquery';

import { PhotoService } from 'src/app/services/photo.service';


@Component({
  selector: 'app-new-rack',
  templateUrl: './new-rack.page.html',
  styleUrls: ['./new-rack.page.scss'],
})
export class NewRackPage implements OnInit {
  result!: string;
  show: boolean = false;

  rackForm:FormGroup;
  selectedImage:any;
  public imageUrl:any;

  // savedFile:any;
  savedImageFile:any;

  photo:any;

  img1:any;

  event:any;

  photos:any = [];


  constructor(private modalCtrl: ModalController, 
    private alertController: AlertController, private actionSheetCtrl: ActionSheetController, 
    private formBuilder: FormBuilder, 
    private router:Router, 
    private route:ActivatedRoute,
    private rackService:RackService,
    public userService:UserService, private platform: Platform,
    public photoService:PhotoService) {
    this.rackForm = formBuilder.group({
      Title: ['', [Validators.required]],
      Description: ['', ],
      Season: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      User_id: [this.userService.currentUser.id, [Validators.required]]
    })
   }

   async ngOnInit() {
    // await this.photoService.loadSaved();
  }
  //  selectFile(event: any): void {
  //   this.selectedImage = event.target.files[0];
  //   console.log(this.selectedImage);
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.img1 = event.target.result;
  //   }

  //   reader.readAsDataURL(this.selectedImage);

  // }

  getPicture(){
    // this.photoService.takePicture();
  }


  remove(){
    // this.img1 = undefined;
    // $('#selectFile').val('');
    this.imageUrl = undefined;
    this.photos = [];
  }

   async addRack(){
    const readFile = await Filesystem.readFile({
      path: this.savedImageFile.filepath,
      directory: Directory.Data,
    });

    this.savedImageFile.webviewPath = `data:image/jpeg;base64,${readFile.data}`;

    let formValues = this.rackForm.value;
    let fd = new FormData();

    fd.append('image', this.savedImageFile.webviewPath);

    // if(this.savedImageFile !== undefined){
    //   fd.append('image', this.savedImageFile);
    // }
    // else if( this.imageUrl !== undefined){
    //   fd.append('image', this.imageUrl);
    // };

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

  

  
  
}
