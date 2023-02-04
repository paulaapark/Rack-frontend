import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuilderInputPageRoutingModule } from './builder-input-routing.module';

import { BuilderInputPage } from './builder-input.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuilderInputPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [BuilderInputPage]
})
export class BuilderInputPageModule {}
