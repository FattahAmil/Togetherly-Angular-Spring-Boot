import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./component/login-page/login-page.component";
import { RegisterPageComponent } from "./component/register-page/register-page.component";
import { IndexPageComponent } from "./component/index-page/index-page.component";
import { PostPageComponent } from "./component/post-page/post-page.component";
import { ProfilePageComponent } from "./component/profile-page/profile-page.component";
import { FriendsPageComponent } from "./component/friends-page/friends-page.component";
import { ChatUserPageComponent } from "./component/chat-user-page/chat-user-page.component";
import { RequestFriendPageComponent } from "./component/request-friend-page/request-friend-page.component";

import { AuthGuard } from "./guard/auth-guard.guard";
import { Auth2Guard } from "./guard/auth2.guard";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent,canActivate: [Auth2Guard]  },
  { path: 'register', component: RegisterPageComponent,canActivate: [Auth2Guard] },
  { path: 'post/:id', component:PostPageComponent,canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsPageComponent,canActivate: [AuthGuard] },
  { path: 'reqFriends', component: RequestFriendPageComponent,canActivate: [AuthGuard] },
  { path: 'privateChat/:email',component:ChatUserPageComponent,canActivate: [AuthGuard] },
  { path: 'profile/:email',component:ProfilePageComponent,canActivate: [AuthGuard] },
  { path: 'index', component: IndexPageComponent,canActivate: [AuthGuard] },
  { path:'',redirectTo:'index',pathMatch:'full'},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
