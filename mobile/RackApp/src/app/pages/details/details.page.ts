import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsForm;

  imageUrl:string|undefined = '';

  constructor(private service:UserService, private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute) { 
    this.detailsForm = formBuilder.group({
      Birthday: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Image: ['']
    });
  }

  ngOnInit(): void {
  }

  details() {
    let formData = this.detailsForm.value;
    this.service.userEdit(formData).subscribe({
        next: (result) => {
          console.log(result);
          alert('Nice getting to know you!');
          this.router.navigate(['../tabs'], {relativeTo: this.route});
        }, 
        error: error => {
        alert('Sorry, something went wrong');
        console.error(error);
        }
    });
  }

  get BirthdayFormControl(){
    return this.detailsForm.get('Birthday')!;
  }

  get GenderFormControl(){
    return this.detailsForm.get('Gender')!;
  }
  get ImageFormControl(){
    return this.detailsForm.get('Image')!;
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

