import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuickRackService } from 'src/app/services/quick-rack.service';

import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-default-head',
  templateUrl: './default-head.component.html',
  styleUrls: ['./default-head.component.scss'],
})
export class DefaultHeadComponent implements OnInit {

  constructor(private router:Router, private service:QuickRackService) {}
    

  ngOnInit() {}

  quickRack(){
    this.service.quickRack();
  }

  logout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['startup']);
  }
  
}
