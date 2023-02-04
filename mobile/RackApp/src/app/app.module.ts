import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SignupPageModule } from './pages/startup/signup/signup.module';
// import { LoginPageModule } from './pages/startup/login/login.module';
import { StartupPageModule } from './pages/startup/startup.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // SignupPageModule,
    // LoginPageModule,
    StartupPageModule,
    Ng2SearchPipeModule,
    NgChartsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
