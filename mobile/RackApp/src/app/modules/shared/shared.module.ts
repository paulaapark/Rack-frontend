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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CitiesComponent } from 'src/app/components/cities/cities.component';
import { ForecastComponent } from 'src/app/components/forecast/forecast.component';


@NgModule({
  declarations: [ DefaultHeadComponent, ItemDetailsComponent, NewRackPage, LoginPage, SignupPage, DetailsPage, CitiesComponent, ForecastComponent],
  providers: [ UserService, RackService ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  exports: [ DefaultHeadComponent, ItemDetailsComponent, NewRackPage, LoginPage, SignupPage, DetailsPage, CitiesComponent, ForecastComponent],
})
export class SharedModule { }
