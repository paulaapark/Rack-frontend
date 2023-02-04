import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SharedModule } from '../modules/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
