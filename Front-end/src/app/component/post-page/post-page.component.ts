import { Component, OnInit, inject } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { UserResponse } from 'src/app/model/UserResponse';
import { DecodeJwt } from 'src/app/model/DecodeJwtToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { User } from 'src/app/model/User';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  constructor(private userServ:UserService,private route: ActivatedRoute,private postService: PostService,private router:Router,private webSocketService:WebSocketService) {
  }
  jwtToken:any=inject(AuthenticationService).getToken();
  decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);
  userDetails: UserResponse = new UserResponse;
  userName!:string;
  userEmail!:string;
  userImage!:string;
  idPost!: number;
  post:any;
  user!:User;
  isLoading=false;
  isHidden=true;
  isHidden2=true;
  length=0;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idPost = +params['id'];
    });
    this.getUserDetails();
    
    
  }
  checkIsAdminOrIsYourPosts(idUserPost:string){
    return (this.decodeJwt.roles[0] =='ROLE_ADMIN' || this.userDetails.body.id == idUserPost);
  
  }
  checkIsAdminOrIsYourPostsOrIsYourComment(idUserPost:string,idUserComment:string){
    return (this.decodeJwt.roles[0] =='ROLE_ADMIN' || this.userDetails.body.id == idUserPost||this.userDetails.body.id==idUserComment);
  
  }
  deleteComment(id:number){
   
    this.postService.deleteComment(id).subscribe(response=>{
      console.log(response)
      this.PostById();
    })
  }

  getUserDetails(){
    this.userServ.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.userName=this.userDetails.body.userName;
        this.userEmail=this.userDetails.body.email;
        this.userImage=this.userDetails.body.profileImage
        this.PostById();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  PostById(){
    this.postService.postById(this.idPost).subscribe((response)=>{
      this.post=response.body;
      this.user=this.post.user;
      this.post['numberLikes']=this.post.like.length;
      this.post['numberComments']=this.post.comment.length;
      //like onLoad
      let userId=this.userDetails.body.id;
      let index =this.post.like.findIndex((like: { users: { id: string; }; }) => like.users.id == userId);
      if (index<0) {
        this.post['isLiked']=false
      }else{
        this.post['isLiked']=true
      }
      setTimeout(()=>{
        this.isLoading=true
      });
      
    });
  }

  ifTherIsMedia():boolean{
    return this.post.mediaList.length !== 0;
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
   likePost(idPost:number,email:string){
     const like=document.getElementById("like");
    
     this.postService.likePost(idPost,this.userDetails.body.id).subscribe(
         (response)=>{
           
           if (response.body) {
             like?.classList.remove("text-white");
             like?.classList.add("text-red-600");
             this.post['numberLikes']++;
             this.webSocketService.sendMessageNotif(email,'notif')
             return;
           }
           like?.classList.remove("text-red-600");
           like?.classList.add("text-white");
           this.post['numberLikes']--;
           
           
         });
   }
   
dropDownMenue(){
  if (this.isHidden==true) {
    this.isHidden=false;
    return;
  }
  
  this.isHidden=true;
 
}
onWrite(event:any){
  let regex = /^[a-zA-Z0-9]$/; 
    if (regex.test(event.key) && this.length<70|| event.key===" " && this.length<100) {
      this.length++;
    }else if(event.key === "Backspace" && this.contentOfComment.length == 1){
     this.length--;
    }else if(event.key === "Backspace" && this.contentOfComment.length > 0){
      this.length--;
    }
    else{
      event.preventDefault();

    }
}
dropDownMenueComment(i:number){
  const menu=document.getElementById("menueDeleteComment"+i);
  if(menu?.classList.contains('hidden')){
    menu?.classList.remove('hidden')
    return;
  }
  menu?.classList.add('hidden');
 
}
dropDownMenueConfirm(){
  if (this.isHidden2==true) {
    this.isHidden2=false;
    return;
  }
  this.isHidden2=true;

}


deletePost(id:number){
  this.postService.deletePost(id).subscribe((response)=>{
    this.router.navigate(["/index"]);

  });
}
contentOfComment:string='';
createComment(){
    if (this.contentOfComment=='') {
      return;
    }
  this.postService.createComment(this.post.id,this.userDetails.body.id,this.contentOfComment).subscribe((response)=>{
    this.webSocketService.sendMessageNotif(this.post.user.email,'notif')
      this.length=0;
      this.contentOfComment='';
      this.PostById();
  })
}

navigateToPostPage(postId: number) {
  this.router.navigate(['/post', postId]);
}
navigateToProfilePage(email: string) {
  this.router.navigate(['/profile', email]);
}



}
