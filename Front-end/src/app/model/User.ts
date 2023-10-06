export class User {
    id!:string;
    firstName!: string;
    lastName!:string;
    password!: string;
    email!: string;
    profileImage!:string;

    User(id:string,firstName:string,lastName:string,email:string,profileImage:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.profileImage=profileImage;
    }
}