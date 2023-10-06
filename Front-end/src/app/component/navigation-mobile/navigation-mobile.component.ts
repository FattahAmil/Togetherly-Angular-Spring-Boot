import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/model/UserResponse';

@Component({
  selector: 'app-navigation-mobile',
  templateUrl: './navigation-mobile.component.html',
  styleUrls: ['./navigation-mobile.component.css']
})
export class NavigationMobileComponent {

  constructor(private router:Router){

  }
  

@Input()
email!:string;

  navigateToYourProfile(){
    this.router.navigate(['/profile', this.email]);
  }
  navigateToYourFriends(){
    this.router.navigate(['/friends']);

  }
  navigateToIndex(){
    this.router.navigate(['/index']);
  }
  navigateToYourReaquest(){
    this.router.navigate(['/reqFriends']);
  }
}
