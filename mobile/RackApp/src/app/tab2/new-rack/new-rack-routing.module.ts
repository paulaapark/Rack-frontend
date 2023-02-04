import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRackPage } from './new-rack.page';

const routes: Routes = [
  {
    path: '',
    component: NewRackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRackPageRoutingModule {}
