import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/model/UserResponse';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAllRead=false
  userDetails: UserResponse = new UserResponse;
  isHiddenNotif=true;
  isHidden=true;
  notifications:any;
  searchInput='';
  dataSearch: Array<{ email: string,firstName:string,lastName:string }> = [];
  dataUsersBySearche:any;

  constructor(private authenticationService:AuthenticationService,private router: Router,private userServ:UserService,private webSocketService:WebSocketService,private notificationService :NotificationService){
  }
  ngOnInit(): void {
    this.getUserDetails();
    this.findAllUsers();
    this.webSocketService.connect();
    setTimeout(() => {
      this.webSocketService.onConnectNotif().subscribe(response=>{
        if (response.content=="updateRole") {
          sessionStorage.clear();
          this.router.navigate(['login']);
          setTimeout(() => {
            location.reload();
          }, 50);
        }
        this.showNotification();
      });
    }, 900);
    
  }
  getUserDetails(){
    this.userServ.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.showNotification();
      
      },
      (error) => {
        console.error(error);
      }
    );
  }
  dropDownMenue(){
    if (this.isHidden==true) {
      this.isHidden=false;
      return;
    }
    
    this.isHidden=true;
   
  }
  dropDownMenueNotif(){
    if (this.isHiddenNotif==true) {
      this.isHiddenNotif=false;
      return;
    }
    
    this.isHiddenNotif=true;
   
  }

  showNotification(){

      this.notificationService.showPostAndUserDetails(this.userDetails.body.id).subscribe((response)=>{
        this.notifications=response.body;
        let i=0
        this.notifications.forEach(() => {
          if (this.notifications[i].isRead==false) {
            this.isAllRead=true;
          }
          i++;
        });
      })
  }
  isMessage(type:string){
    return type==="MESSAGE"
  }
  isComment(type:string){
    return type==="COMMENT"
  }
  isLike(type:string){
    return type==="LIKE"
  }
  isFollow(type:string){
    return type==="FOLLOW"
  }
  isRead(read:boolean){
      return read==true
  }
  timeGenerator(date:number){
    const previousTime= new Date(date)
    const currentTime = new Date();
      const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - previousTime.getTime()) / 1000);
      if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds} seconds ago`;
      }if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} minutes ago`;
      } if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return  `${hours} hours ago`;
      } if (timeDifferenceInSeconds < 2592000) {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} days ago`;
      }  
        const months = Math.floor(timeDifferenceInSeconds / 2592000);
        return `${months} months ago`;
  }
  navigateToProfilePage(emailProfile:string,idPost:number,idUserFrom:string,idRecepeint:string,type:string) {
    if (emailProfile!=null) {
      if(type=="FOLLOW"){
      this.router.navigate(['profile', emailProfile]);
            this.funcRead(idUserFrom,idRecepeint,type,idPost);
            setTimeout(() => {
              location.reload()
            }, 50);
            return;
      }
      this.router.navigate(['privateChat', emailProfile]);
            this.funcRead(idUserFrom,idRecepeint,type,idPost);
            setTimeout(() => {
              location.reload()
            }, 50);
            return;
      
    }
     this.router.navigate(['post', idPost]);
     this.funcRead(idUserFrom,idRecepeint,type,idPost);
     setTimeout(() => {
      location.reload()
     }, 50);
     
  }

  funcRead(idUserFrom:string,idRecepeint:string,type:string,idpost:number){
   this.notificationService.funcRead(idRecepeint,idUserFrom,type,idpost).subscribe((respons)=>{
   
    });
   
     
  }
  findAllUsers(){
    this.userServ.findAllUsers().subscribe(response=>{
      this.dataSearch=response.body;
    
    });
  }
  onSearch(event:KeyboardEvent){
    let regex = /^[a-zA-Z]$/; 
    if (regex.test(event.key)) {
      this.dataUsersBySearche = this.dataSearch.filter((row) => (row['firstName'].toLowerCase()+row['lastName'].toLowerCase()).includes(this.searchInput.toLowerCase().trim().concat(event.key)));
    }else if(event.key === "Backspace" && this.searchInput.length < 2){
      this.dataUsersBySearche=[];
    }else if(event.key === "Backspace" && this.searchInput.length > 0){
      this.dataUsersBySearche = this.dataSearch.filter((row) => (row['firstName'].toLowerCase()+row['lastName'].toLowerCase()).includes(this.searchInput.toLowerCase().trim().substring(0,this.searchInput.length-1)));
    }
    else{
      event.preventDefault();

    }
  }
  navigateToProfilePage2(emailProfile:string) {
    this.router.navigate(['/profile', emailProfile]).then(()=>{
      location.reload()
    })    
  }

  logout(){
    this.authenticationService.logout();
    this.webSocketService.disconnect();
  }
}
