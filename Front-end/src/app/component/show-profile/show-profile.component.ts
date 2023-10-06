import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { UserService } from "src/app/service/user.service";


@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit,OnDestroy {
  private subscription: Subscription;
  userDetails: UserResponse = new UserResponse;
  likes:number=0;
  followers:number=0;
  following:number=0;
constructor(private userService:UserService,private communicationService: CommunicationServiceService,private router: Router){
  this.subscription = this.communicationService.triggerFunction2$.subscribe(() => {
    this.getUserDetails();
  });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails(){
    this.userService.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.getNumbersOfLikesFollowersFollowing()
      },
      (error) => {
        console.error(error);
      }
    );
  }
  navigateToProfilePage(emailProfile:string) {
    this.router.navigate(['/profile', emailProfile]);
  }
  getNumbersOfLikesFollowersFollowing(){
    const id=this.userDetails.body.id;
    this.userService.getNumbersOfLikesFollowersFollowing(id).subscribe((response)=>{
        this.likes=response.body.numberOfLikes;
        this.followers=response.body.numberOfFollowers;
        this.following=response.body.numberOfFollowing;
       
    });
  }

}
