export class UserResponse{
    body: {
            id: string,
        firstName: string,
        lastName: string,
        userName: string, 
        email: string, 
        profileImage: string
    } = {
        id: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        profileImage: ""
    }; 
    

    statusCode: string='';
    statusCodeValue: number=0;
}
