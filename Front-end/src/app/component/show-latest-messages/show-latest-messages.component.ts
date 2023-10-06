import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-show-latest-messages',
  templateUrl: './show-latest-messages.component.html',
  styleUrls: ['./show-latest-messages.component.css']
})
export class ShowLatestMessagesComponent {
  userDetails: UserResponse = new UserResponse;
  usersFriends:any;
constructor(private userService:UserService,private router:Router,private CommunicationService:CommunicationServiceService){
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
    this.userService.getUserFriends(this.userDetails.body.id).subscribe((response)=>{
     
      this.usersFriends=response.body;
    });
  }
  navigateToChatByUser(emailUser:string){
    this.router.navigate(['/privateChat',emailUser]).then(()=>{
      location.reload()
    });
  }
  navigateToProfilePage(emailProfile:string) {
    this.router.navigate(['/profile', emailProfile]).then(()=>{
      location.reload()
    })
    
    
  }

}
