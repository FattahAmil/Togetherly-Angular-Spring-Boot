import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'http://127.0.0.1:8082/notification';

  headers = new HttpHeaders({
   'Content-Type':'application/json',
   'Authorization':'Bearer '+inject(AuthenticationService).getToken()
  });
 

 constructor(private http: HttpClient, private router: Router) {}

 showPostAndUserDetails(idUser:String):Observable<any>{
  const user={
    idUser:idUser
  }
  return this.http.post(`${this.url}/getNotification`,user,{headers:this.headers});
 }

 funcRead(idUserFrom:String,idUserto:String,type:string,idPost:number):Observable<any>{
  const notif={
    recipientId:idUserto,
    userFromId:idUserFrom,
    typeNotif:type,
    idPost:idPost

  }
  return this.http.post(`${this.url}/readNotification`,notif,{headers:this.headers})
 }


}
