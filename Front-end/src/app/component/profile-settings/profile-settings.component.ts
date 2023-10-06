import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DecodeJwt } from 'src/app/model/DecodeJwtToken';
import jwt_decode from 'jwt-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  emailProfile!:string;
  userDetails:any;
  password='';
  isLoading=false
  selectedRole!:string
  jwtToken:any=inject(AuthenticationService).getToken();
  decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);
  form!:FormGroup;
  imageUrl!:SafeUrl;
  fileData:any;
  file:any;
  rolePreced!:string;

  
  
  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute,private router :Router,private userService:UserService,private webSocketService:WebSocketService){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.emailProfile = params['email'];
    });
    this.getInfoUser();
    
    
  }
  getInfoUser(){
    this.userService.getUserByEmail(this.emailProfile).subscribe(response=>{
      this.userDetails=response.body
      this.imageUrl=response.body.profileImage;
      this.selectedRole=this.userDetails.roles[0].name;
      this.rolePreced=this.userDetails.roles[0].name;
      setTimeout(() => {
      this.isLoading=true
      this.form = new FormGroup({
        'firstName':new FormControl(this.userDetails.firstName,[Validators.required,Validators.pattern("^[A-Za-z]{2,20}$")]),
        'lastName':new FormControl(this.userDetails.lastName,[Validators.required,Validators.pattern("^[A-Za-z]{2,20}$")]),
        'email': new FormControl(this.userDetails.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]{1,35}@[a-zA-Z0-9.-]{1,10}\\.[a-zA-Z]{2,10}$")]),
      })
      
    }, 500);
    setTimeout(() => {
      this.checkRoleAdminTeacher();
      this.checkIfYoursAndRoleAdmin();
    }, 600); 
    })
  }
  checkRoleAdminTeacher(){
    const selectOption=document.getElementById("roles");
   if(this.decodeJwt.roles[0] !=='ROLE_ADMIN' ){
      selectOption?.setAttribute('disabled','true');
   }
  }
  onUpdate(){
    
      let user = {
        id:this.userDetails.id,
        firstName:this.form.get('firstName')?.value,
        lastName:this.form.get('lastName')?.value,
        email:this.form.get('email')?.value,
        role:this.selectedRole,
        profileImage:'',
        fileType:''
      }
      if (this.file!=undefined) {
        this.convertFile(this.file).subscribe(response=>{
          user.profileImage=response;
          user.fileType=this.file.type
          
        });
      }
        setTimeout(() => {
          this.userService.updateUser(user).subscribe(response=>{
          
          if (this.decodeJwt.roles[0]!=response.body.role && this.decodeJwt.sub==this.emailProfile) {
            sessionStorage.clear();
            this.router.navigate(['login']);
          }else if(this.rolePreced!=response.body.role && this.decodeJwt.sub!=this.emailProfile){
              this.webSocketService.sendMessageNotif(this.emailProfile,'updateRole');
              this.rolePreced=response.body.role;
          }
          location.reload();
          })
        }, 100);
        
      // this.userService.updateUser(user).subscribe(response=>{
        
      //   console.log(response)

      // })
    

    

  }
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    // @ts-ignore
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  onSelecteImage(event:any){
    if (event.target.files) {
      this.file=event.target.files[0];
      const reader = new FileReader();
     if (!this.file) {
          return;
      }
    reader.onload= (e) => {
      this.fileData=reader.result
   
    };
    reader.readAsText(this.file);
    
    this.imageUrl= this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));

      
    }
  }

  checkIfYoursAndRoleAdmin(){
    const firstName=document.getElementById("firstName");
    const lastName=document.getElementById("lastName");
    const save=document.getElementById("save");
    const email=document.getElementById("email");
    const image=document.getElementById("image");
    
     if ( this.decodeJwt.roles[0] =='ROLE_ADMIN') {
     
    }else if(this.emailProfile!==this.decodeJwt.sub ){
      firstName?.setAttribute('readOnly','true');
      lastName?.setAttribute('readOnly','true');
      email?.setAttribute('readOnly','true');
      image?.setAttribute('disabled','true');
      save?.classList.add('hidden')
    }
  }

}


