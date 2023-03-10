import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({providedIn: 'root'})
export class UserService {
  public baseUrl:string; 
  environment:string = 'development'; //development or production

  // userId:any = this.startupPage.userId ; 
  
  constructor(private http:HttpClient) { 
    if (this.environment === 'development'){
      this.baseUrl = "http://localhost:3000/"
    }
    else {
      this.baseUrl = 'https://rack-p.herokuapp.com/'
    };
  }
  
  public currentUser:any = JSON.parse(localStorage.getItem('currentUser')!);
  
  login(formData:object){
    return this.http.post(this.baseUrl + 'login', formData);
  }

  signup(formData:object){
    return this.http.post(this.baseUrl + 'signup', formData);
  }

  get_current_user(){
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isAuthenticated(){
    return this.get_current_user() ? true: false;
  }

  getUserDetails(){
    let userUrl = this.baseUrl + 'users?id=' + this.currentUser.id;
    return this.http.get(userUrl);
  }

  userEdit(formData:object){
    let userUrl = this.baseUrl + 'users/' + this.currentUser.id;
    return this.http.patch(userUrl, formData);
  }

  userDetailsEdit(formData:object){
    let userUrl = this.baseUrl + 'users/details/' + this.currentUser.Id;
    return this.http.patch(userUrl, formData);
  }

  userLREdit(formData:object){
    let url = this.baseUrl + 'users/lr/' + this.currentUser.id;
    return this.http.patch(url, formData);
  }
  
};
