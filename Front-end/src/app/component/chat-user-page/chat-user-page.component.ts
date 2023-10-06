import { Component, Input, OnInit,ElementRef, Renderer2, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { MessagServiceService } from 'src/app/service/messag-service.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-chat-user-page',
  templateUrl: './chat-user-page.component.html',
  styleUrls: ['./chat-user-page.component.css']
})
export class ChatUserPageComponent implements OnInit {
  userDetails: UserResponse = new UserResponse;
  usersFriends:any;
  emailProfile!:string;
  idProfile!:string;
  firstNameProfile!:string;
  lastNameProfile!:string;
  profileImageProfile!:string;
  allMessage:any;
  ifFriend:any;
  content='';
  length=0;

constructor(private userService:UserService,private messageService:MessagServiceService,private route: ActivatedRoute,private router:Router,private elementRef: ElementRef, private renderer: Renderer2,private webSocketService:WebSocketService,private CommunicationService:CommunicationServiceService){
 
  this.getUserDetails();
}
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.emailProfile = params['email'];
    });
    setTimeout(() => {
      this.scrollToLastElement();
    }, 500);
    setTimeout(() => {
      const allMessages=document.getElementById("allMessages");
      this.webSocketService.onConnect2().subscribe(response=>{
          if (allMessages!=null) {
            allMessages.innerHTML+='<div><div class="flex w-full mt-2 space-x-3 max-w-xs"><div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"><img class="w-10 h-10 rounded-full" src="'+this.userDetails.body.profileImage+'" alt="Rounded avatar"></div><div><div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg"><p class="text-sm break-all">'+response.content+'</p></div><span class="text-xs text-gray-500 leading-none">'+this.timeGenerator(response.createdAt)+'</span></div></div></div>';
          }

      });
    }, 900);
  }

getUserDetails(){
  this.userService.getUserToken().subscribe(
    (userData) => {
      this.userDetails = userData ;
      this.getUserFriends();
      this.getUserDetailsByUser();
      
    },
    (error) => {
      console.error(error);
    }
  );
}
timeGenerator(date:number){
  const previousTime= new Date(date);
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
checkIfSenderorReciever(idSender:string){
  if (idSender===this.userDetails.body.id) {
    return true
  }
  return false
}

getUserFriends(){
  this.userService.getUserFriends(this.userDetails.body.id).subscribe((response)=>{
   
    this.usersFriends=response.body;
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
getUserDetailsByUser(){
  this.userService.getUserByEmail(this.emailProfile).subscribe((response)=>{
    this.idProfile=response.body.id
    this.firstNameProfile=response.body.firstName;
    this.lastNameProfile=response.body.lastName;
    this.profileImageProfile=response.body.profileImage;
    this.getPrivateMessages();
    this.showCheckIfFriend()
  })
}
sendPrivateMessage(){
  const allMessages=document.getElementById("allMessages");
  const date:Date=new Date();
  if (this.content.trim()!='') {
    this.webSocketService.sendPrivateMessage(this.userDetails.body.id,this.idProfile,this.content,'CHAT');
    if(allMessages!=null){
      allMessages.innerHTML+='<div><div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"><div><div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg"><p class="text-sm break-all">'+this.content+'</p></div><span class="text-xs text-gray-500 leading-none">'+this.timeGenerator(date.getTime())+'</span></div><div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"><img class="w-10 h-10 rounded-full" src="'+this.userDetails.body.profileImage+'" alt="Rounded avatar"></div></div></div>';
      this.content='';
      this.length=0
      setTimeout(() => {
        this.webSocketService.sendMessageNotif(this.emailProfile,'send Message');
      }, 400);
    }
  }
}
getPrivateMessages(){
  this.messageService.getMessaageBySenderReciver(this.userDetails.body.id,this.idProfile).subscribe((response)=>{
    this.allMessage=response.body;
  });
}
scrollToLastElement() {
  const container = this.elementRef.nativeElement.querySelector('#allMessages'); // Replace 'container-class' with the class of your container element
  if (container) {
    const lastElement = container.lastElementChild;
    if (lastElement) {
      lastElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
showCheckIfFriend(){
  const messageInput=document.getElementById("MessageInput");
  const sendButton=document.getElementById("SendButton");
  this.userService.checkIfFriend(this.userDetails.body.id,this.idProfile).subscribe(response=>{
    this.ifFriend=response.body
    if (this.ifFriend==false) {
      messageInput?.setAttribute('disabled','true');
      messageInput?.classList.add('cursor-not-allowed');
      sendButton?.setAttribute('disabled','true');
      sendButton?.classList.add('cursor-not-allowed');
    }
  })

}
onWrite(event:any){
  let regex = /^[a-zA-Z0-9]$/; 
    if (regex.test(event.key) && this.length<250 || event.key===" " && this.length<100) {
      this.length++;
    }else if(event.key === "Backspace" && this.content.length == 1){
     this.length--;
    }else if(event.key === "Backspace" && this.content.length > 0){
      this.length--;
    }
    else{
      event.preventDefault();

    }
}


}
