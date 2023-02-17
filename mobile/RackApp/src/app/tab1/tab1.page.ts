import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
public myDate = new Date();
public hrs = this.myDate.getHours();
public greeting:string;
public firstName!:string;


  constructor(public userService:UserService, private router:Router, private route:ActivatedRoute) {
    if (this.hrs < 12){
      this.greeting = 'Good Morning';
    }else if ( this.hrs >= 12 && this.hrs <=17){
      this.greeting = 'Good Afternoon';
    }else{
      this.greeting = 'Good Evening';
    }
  }

  ngOnInit() {
    this.firstName = this.userService.currentUser.FirstName;
  }

  stats(){
    this.router.navigate(['stats'], {relativeTo: this.route});
  }
}
