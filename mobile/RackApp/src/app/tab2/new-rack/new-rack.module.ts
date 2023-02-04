import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRackPageRoutingModule } from './new-rack-routing.module';

import { NewRackPage } from './new-rack.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewRackPageRoutingModule,
    SharedModule
  ],
  declarations: [NewRackPage]
})
export class NewRackPageModule {}
