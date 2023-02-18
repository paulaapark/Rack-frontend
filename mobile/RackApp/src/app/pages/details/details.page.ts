import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsForm;

  selectedImage:any;

  img1:any;

  public bUrl:string = this.service.baseUrl;


  constructor(private service:UserService, private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute, private modalCtrl:ModalController) { 
    this.detailsForm = formBuilder.group({
      Birthday: ['', [Validators.required]],
      Gender: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  details() {
    let formData = this.detailsForm.value;
    this.service.userEdit(formData).subscribe({
        next: (result) => {
          console.log(result);
          return this.modalCtrl.dismiss(null, 'success');
        }, 
        error: error => {
          console.error(error);
          return this.modalCtrl.dismiss(null, 'error');
        }
    });
  }

  later(){
    return this.modalCtrl.dismiss(null, 'later');
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

  get BirthdayFormControl(){
    return this.detailsForm.get('Birthday')!;
  }

  get GenderFormControl(){
    return this.detailsForm.get('Gender')!;
  }
  get ImageFormControl(){
    return this.detailsForm.get('Image')!;
  }

}

