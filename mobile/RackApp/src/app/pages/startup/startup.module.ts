import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartupPageRoutingModule } from './startup-routing.module';

import { StartupPage } from './startup.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserService } from 'src/app/services/user.service';


@NgModule({
  providers: [ UserService ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartupPageRoutingModule,
    Ng2SearchPipeModule,
    SharedModule
  ],
  declarations: [StartupPage],
})
export class StartupPageModule {}
