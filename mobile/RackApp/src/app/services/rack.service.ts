import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RackService {
  
  typeQuery:string = '&Item_type=';
  seasonQuery:string = '&Season=';
  rackUrl:string = this.service.baseUrl + 'rack';

  public currentUser: any = this.service.currentUser;
  userUrl:string = this.rackUrl + '?User_id=' + this.currentUser.id;
  
  constructor(private http:HttpClient, public service:UserService) { 
    
  }
  
  

  newRack(formData:object){
    return this.http.post(this.rackUrl, formData)
  };

  getRack(){
    return this.http.get(this.rackUrl)
  };
  
  getUserRack(){
    return this.http.get(this.userUrl)
  };

  getUserTops(){
    return this.http.get(this.userUrl + this.typeQuery + 'Top')
  };
  getUserBottoms(){
    return this.http.get(this.userUrl + this.typeQuery + 'Bottom')
  };
  getUserSpring(){
    return this.http.get(this.userUrl + this.seasonQuery + 'Spring')
  };
  getUserSummer(){
    return this.http.get(this.userUrl + this.seasonQuery + 'Summer')
  };
  getUserFall(){
    return this.http.get(this.userUrl + this.seasonQuery + 'Fall')
  };
  getUserWinter(){
    return this.http.get(this.userUrl + this.seasonQuery + 'Winter')
  };


}