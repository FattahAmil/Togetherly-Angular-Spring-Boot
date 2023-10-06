import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://127.0.0.1:8082/posts';

   headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+inject(AuthenticationService).getToken()
   });
  

  constructor(private http: HttpClient, private router: Router) {}

  showPostAndUserDetails(id:String):Observable<any>{
   return this.http.get(`${this.url}/PostUser/`+id,{headers:this.headers});
  }
  likePost(idPost:number,idUser:string):Observable<any>{
    const like={
      idPost: idPost,
      idUser: idUser
    }
    return this.http.post<any>(`${this.url}/like`, like,{headers:this.headers})
  }
  createPost(post: object):Observable<any> {
    console.log(post);
   return this.http.post<any>(`${this.url}/create`, post,{headers:this.headers})
  }
  deletePost(idPost:number):Observable<any>{
    const post={
      idPost: idPost
    }
    return this.http.post<any>(`${this.url}/delete`, post,{headers:this.headers})
  }
  postById(idPost:number):Observable<any>{
    const post={
      idPost: idPost
    }
    return this.http.post<any>(`${this.url}/PostById`, post,{headers:this.headers})
  }
  createComment(idPost:number,idUser:string,content:string):Observable<any>{
    const comment={
      idUser :idUser ,
      idPost :idPost ,
      content :content
    }
    
    return this.http.post<any>(`${this.url}/comment`, comment,{headers:this.headers})
  }
  deleteComment(idComment:number):Observable<any>{
    const comment={
      idComment:idComment
    }
    return this.http.post<any>(`${this.url}/deleteComment`, comment,{headers:this.headers})
  }

}
