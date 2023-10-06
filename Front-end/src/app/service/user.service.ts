import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Response } from '../model/Response';
import { AuthenticationService } from "./authentication.service";
import jwt_decode from 'jwt-decode';
import { DecodeJwt } from "../model/DecodeJwtToken";
import { FollowReq } from '../model/FollowReq';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://127.0.0.1:8082/User';


  constructor(private http: HttpClient, private router: Router,private authService:AuthenticationService) {}
  
  getUserToken(): Observable<any>{
    const token = this.authService.getToken();
    
    if (token) {
      const decodeJwt: DecodeJwt = jwt_decode(token);
      const email: string = decodeJwt.sub;
     return this.http.get<any>(`${this.url}/email/` + email)
    }
    return of(null);
  }
  followReq(followReq:FollowReq):Observable<any>{
    return this.http.post(`${this.url}/follow`,followReq);
  }
  getUserByEmail(email:string): Observable<any>{
    return this.http.get<any>(`${this.url}/email/` + email)
  }

  getUserNotFollwed(id:String):Observable<any>{
    return  this.http.get(`${this.url}/notFollowed/${id}`);
  }
  checkIfFriend(idUser1:string,idUser2:string):Observable<any>{
    const users={
      senderId:idUser1,
      recipientId:idUser2
    }
    return this.http.post(`${this.url}/isFriend`,users);
  }
  checkIfFollow(following:string,followed:string):Observable<any>{
    const users={
      following:following,
      followed:followed
    }
    return this.http.post(`${this.url}/isFollow`,users);
  }
  updateUser(user:any):Observable<any>{
    return this.http.put(`${this.url}/update`,user)
  }
  getNumbersOfLikesFollowersFollowing(idUser:String):Observable<any>{
    const user={
      idUser:idUser
    }

    return  this.http.post(`${this.url}/getNumbers`,user);
  }

  getUserFriends(id:String):Observable<any>{
    return  this.http.get(`${this.url}/getFriends/${id}`);
  }
  findAllUsers():Observable<any>{
    return this.http.get(`${this.url}/findAllUsers`);
  }

}