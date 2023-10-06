import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { FileHandle } from 'src/app/model/FileHandle';
import { Post } from 'src/app/model/Post';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { PostService } from "src/app/service/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{
  messageTextArea: HTMLInputElement|undefined ;
  constructor(private sanitizer:DomSanitizer,private postService:PostService,private communicationService: CommunicationServiceService){}
  ngOnInit(): void {
    this.messageTextArea = document.getElementById('message') as HTMLInputElement;
  }
 post:Post={
  content:"",
  id:"",
  isEvent:false,
  mediaList:[]
 }
 length=0;
 
 fileData:any;
 @Input()
 userDetails: UserResponse = new UserResponse;



 onMediaSelected(event:any){
  if (event.target.files) {
    const file=event.target.files[0];
    const reader = new FileReader();
     if (!file) {
          return;
    }
    reader.onload= (e) => {
      this.fileData=reader.result
   
    };
    reader.readAsText(file);
    let myFile:string;
    let fileHandle:FileHandle;
    this.convertFile(file).subscribe(fileConverted => {
      myFile = fileConverted; 
       fileHandle={
        fileName:file.name,
        fileSize:file.size,
        fileType:file.type,
        mediaUrl: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
       fileContent:myFile,
      };
      
      this.post.mediaList.push(fileHandle);
    })    
  }
 }
onWrite(event:any){
  let regex = /^[a-zA-Z0-9]$/; 
  
    if (regex.test(event.key) && this.length<100 || event.key===" " && this.length<100) {
      this.length++;
    }else if(event.key === "Backspace" && this.post.content.length == 1){
     this.length--;
    }else if(event.key === "Backspace" && this.post.content.length > 0){
      this.length--;
    }
    else{
      event.preventDefault();

    }
}
onCreate(){
  this.post.id=this.userDetails.body.id;
  this.postService.createPost(this.post).subscribe(value=>{
    this.post.mediaList=[];
  if (this.messageTextArea) {
  this.messageTextArea.value='';
  } 
  this.length=0;
  this.communicationService.triggerFunction();
  });
}
convertFile(file : File) : Observable<string> {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  // @ts-ignore
  reader.onload = (event) => result.next(btoa(event.target.result.toString()));
  return result;
}


 removeMedia(i:number){
  this.post.mediaList.splice(i,1);
 
 }
 
 isImage(i:number):boolean{
  const url = this.post.mediaList[i].fileType;
  return url.endsWith('jpg') || url.endsWith('jpeg') || url.endsWith('png');
 }

 isVideo(i:number):boolean{
  const url = this.post.mediaList[i].fileType;
  return url.endsWith('mp4') || url.endsWith('mov') || url.endsWith('avi');
 }
}
