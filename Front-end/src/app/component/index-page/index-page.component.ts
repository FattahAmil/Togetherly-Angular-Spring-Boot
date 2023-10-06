import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserResponse } from 'src/app/model/UserResponse';
import { DecodeJwt } from 'src/app/model/DecodeJwtToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
})
export class IndexPageComponent implements OnInit {
  constructor(private userServ: UserService) {}
  jwtToken: any = inject(AuthenticationService).getToken();
  decodeJwt: DecodeJwt = jwt_decode(this.jwtToken);
  userDetails: UserResponse = new UserResponse();
  userName!: string;
  userEmail!: string;
  userImage!: string;
  ngOnInit() {
    this.getUserDetails();
  }

  checkRoleAdminTeacher() {
    return (
      this.decodeJwt.roles[0] == 'ROLE_ADMIN' ||
      this.decodeJwt.roles[0] == 'ROLE_TEACHER'
    );
  }

  getUserDetails() {
    this.userServ.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData;
        this.userName = this.userDetails.body.userName;
        this.userEmail = this.userDetails.body.email;
        this.userImage = this.userDetails.body.profileImage;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
