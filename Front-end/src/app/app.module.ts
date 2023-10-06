import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { IndexPageComponent } from './component/index-page/index-page.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { ShowPostComponent } from './component/show-post/show-post.component';
import { ShowFollowersComponent } from './component/show-followers/show-followers.component';
import { ShowProfileComponent } from './component/show-profile/show-profile.component';
import { ShowLatestMessagesComponent } from './component/show-latest-messages/show-latest-messages.component';
import { PostPageComponent } from './component/post-page/post-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';
import { ShowPostProfileComponent } from './component/show-post-profile/show-post-profile.component';
import { WebSocketService } from './service/web-socket.service';
import { ChatUserPageComponent } from './component/chat-user-page/chat-user-page.component';
import { FriendsPageComponent } from './component/friends-page/friends-page.component';
import { RequestFriendPageComponent } from './component/request-friend-page/request-friend-page.component';
import { ProfileSettingsComponent } from './component/profile-settings/profile-settings.component';
import { NavigationMobileComponent } from './component/navigation-mobile/navigation-mobile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    IndexPageComponent,
    NavBarComponent,
    CreatePostComponent,
    ShowPostComponent,
    ShowFollowersComponent,
    ShowProfileComponent,
    ShowLatestMessagesComponent,
    PostPageComponent,
    ProfilePageComponent,
    ShowPostProfileComponent,
    ChatUserPageComponent,
    FriendsPageComponent,
    RequestFriendPageComponent,
    ProfileSettingsComponent,
    NavigationMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
