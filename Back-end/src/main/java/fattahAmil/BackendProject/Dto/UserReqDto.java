package fattahAmil.BackendProject.Dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserReqDto {
    String id;
    String firstName;
    String lastName;
    String email;
    String role;
    byte[] profileImage;
    String fileType;
}
