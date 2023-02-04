import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    SharedModule,
    NgChartsModule
    
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
