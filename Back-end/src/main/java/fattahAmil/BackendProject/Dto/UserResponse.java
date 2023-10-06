package fattahAmil.BackendProject.Dto;

import fattahAmil.BackendProject.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    String id;
    String firstName;
    String lastName;
    String userName;
    String email;
    String profileImage;
    List<Role> roles;


    public  UserResponse(String id, String firstName, String lastName, String userName, String email,String profileImage){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.userName=userName;
        this.email=email;
        this.profileImage=profileImage;
    }
}
