import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DefaultHeadComponent } from 'src/app/components/default-head/default-head.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RackService } from 'src/app/services/rack.service';
import { ItemDetailsComponent } from 'src/app/components/item-details/item-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRackPage } from 'src/app/tab2/new-rack/new-rack.page';
import { LoginPage } from 'src/app/pages/startup/login/login.page';
import { SignupPage } from 'src/app/pages/startup/signup/signup.page';
import { DetailsPage } from 'src/app/pages/details/details.page';


@NgModule({
  declarations: [ DefaultHeadComponent, ItemDetailsComponent, NewRackPage, LoginPage, SignupPage, DetailsPage],
  providers: [ UserService, RackService ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ DefaultHeadComponent, ItemDetailsComponent, NewRackPage, LoginPage, SignupPage, DetailsPage ],
})
export class SharedModule { }
