import { Component, Input, OnDestroy, OnInit, Sanitizer, inject } from '@angular/core';
import { PostService } from "src/app/service/post.service";
import { UserResponse } from 'src/app/model/UserResponse';
import { UserService } from "src/app/service/user.service";
import { FollowReq } from 'src/app/model/FollowReq';
import { Subscription } from 'rxjs';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { PostReq } from 'src/app/model/PostReq';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DecodeJwt } from 'src/app/model/DecodeJwtToken';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-show-post-profile',
  templateUrl: './show-post-profile.component.html',
  styleUrls: ['./show-post-profile.component.css']
})
export class ShowPostProfileComponent implements OnInit,OnDestroy {
  @Input()
  idUserPost!:string;

  private subscription: Subscription;
  userDetails:UserResponse=new UserResponse()
  followReq:FollowReq=new FollowReq() ;
  idUser:string='';
  posts: any;
  Post2!:[PostReq];
  isliked:boolean=false;
  jwtToken:any=inject(AuthenticationService).getToken();
  decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);

  constructor(private postService:PostService,private userService:UserService,private communicationService: CommunicationServiceService,private router: Router,private webSocketService:WebSocketService){
    this.subscription = this.communicationService.triggerFunction$.subscribe(() => {
      this.getUserDetails();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {  

    this.getUserDetails();
    
  }

  getUserDetails(){
    this.userService.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.showPostUser();
      },
      (error) => {
        console.error(error);
      }
    );
  }
showPostUser(){
    this.postService.showPostAndUserDetails(this.idUserPost).subscribe(
      (response)=>{
        this.posts=response.body;
        this.posts.reverse();
        
        
        let i=0
        this.posts.forEach((post: { like: any[]; }) => {
          this.posts[i]['numberLikes']=this.posts[i].like.length;
          this.posts[i].comment.reverse();

          //like onLoad
          let userId=this.userDetails.body.id;
          let index =post.like.findIndex((like) => like.users.id == userId);
          if (index<0) {
            this.posts[i]['isLiked']=false
          }else{
            this.posts[i]['isLiked']=true
          }
          i++;
        });
       
        
      });
}

ifTherIsMedia(i:number):boolean{
 return this.posts[i].mediaList.length !== 0;
}
convertImage(media: string,type:string) {
  var url = 'data:'+type+';base64,' + media;
  return url;
}
isImage(i:string):boolean{

  return i.endsWith('jpg') || i.endsWith('jpeg') || i.endsWith('png');
 }
 isVideo(i:string):boolean{
  return i.endsWith('mp4') || i.endsWith('mov') || i.endsWith('avi');
 }
pathGen(path:string){
  return"assets/media/"+path;
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
likePost(idPost:number,i:number,email:string){
  const like=document.getElementById("like-"+i);
  this.postService.likePost(idPost,this.userDetails.body.id).subscribe(
      (response)=>{
        
        if (response.body) {
          like?.classList.remove("text-white");
          like?.classList.add("text-red-600");
          this.posts[i]['numberLikes']++;
          this.communicationService.triggerFunction3();
          this.webSocketService.sendMessageNotif(email,'likePost');
          
          return;
        }
        like?.classList.remove("text-red-600");
        like?.classList.add("text-white");
        this.posts[i]['numberLikes']--;
        this.communicationService.triggerFunction3();
        
      });
}

checkIsAdminOrisYourPosts(idUserPost:string){
  return (this.decodeJwt.roles[0] =='ROLE_ADMIN' || this.userDetails.body.id == idUserPost);

}

dropDownMenue(id:number){
  const menu=document.getElementById("dropdownDots"+id);
  if(menu?.classList.contains('hidden')){
    menu?.classList.remove('hidden')
    return;
  }
  menu?.classList.add('hidden');
}
dropDownMenueConfirm(id:number){
  const menu=document.getElementById("dropdownConfirm"+id);
  if(menu?.classList.contains('hidden')){
    menu?.classList.remove('hidden')
    menu?.classList.add('flex')
    return;
  }
  menu?.classList.remove('flex')
  menu?.classList.add('hidden');
}


deletePost(id:number){
  this.postService.deletePost(id).subscribe((response)=>{
 
    this.showPostUser();

  });
}

navigateToPostPage(postId: number) {
  this.router.navigate(['/post', postId]);
}

navigateToProfilePage(emailProfile:string) {
  this.router.navigate(['/profile', emailProfile]).then(()=>{
    location.reload()
  });
}



}
