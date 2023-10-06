import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagServiceService {
  private url = 'http://127.0.0.1:8082/chatMessage';
  
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+inject(AuthenticationService).getToken()
   });
  constructor(private http: HttpClient) { }

  getMessaageBySenderReciver(senderId:string,recipientId:string):Observable<any>{
      const chatDto={
        senderId:senderId,
        recipientId:recipientId
      }
    return this.http.post<any>(`${this.url}/getChat`, chatDto,{headers:this.headers});
  }
}
