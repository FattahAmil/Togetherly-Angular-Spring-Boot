import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FollowReq } from 'src/app/model/FollowReq';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-request-friend-page',
  templateUrl: './request-friend-page.component.html',
  styleUrls: ['./request-friend-page.component.css']
})
export class RequestFriendPageComponent {
  userDetails: UserResponse = new UserResponse;
  usersReqFriends:any;
  followReq:FollowReq=new FollowReq() ;

constructor(private userService:UserService,private router:Router,private webSocketService:WebSocketService){
  this.getUserDetails();
}

getUserDetails(){
  this.userService.getUserToken().subscribe(
    (userData) => {
      this.userDetails = userData ;
      this.getUserFriends()
    },
    (error) => {
      console.error(error);
    }
  );
}
  
  getUserFriends(){
    this.userService.getUserNotFollwed(this.userDetails.body.id).subscribe((response)=>{
     
      this.usersReqFriends=response.body;
    });
  }
  navigateToProfilePage(emailProfile:string) {
    this.router.navigate(['/profile', emailProfile]).then(()=>{
      location.reload()
    })    
  }
  navigateToChatByUser(emailUser:string){
    this.router.navigate(['/privateChat',emailUser]).then(()=>{
      location.reload()
    });
  }
  followRequest(followedId:string,emailFollowed:string){
    this.followReq.followed=followedId;
    this.followReq.following=this.userDetails.body.id;
    this.userService.followReq(this.followReq).subscribe(
      (response)=>{
        this.webSocketService.sendMessageNotif(emailFollowed,"you are followed by"+this.userDetails.body.email);
        this.getUserFriends();
      }
    );
   

  }
}
