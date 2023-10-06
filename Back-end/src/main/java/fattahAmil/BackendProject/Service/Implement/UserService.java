package fattahAmil.BackendProject.Service.Implement;


import fattahAmil.BackendProject.Dto.FollowDto;
import fattahAmil.BackendProject.Dto.NumberOfLikesFollowersFollowingDto;
import fattahAmil.BackendProject.Dto.UserReqDto;
import fattahAmil.BackendProject.Dto.UserResponse;
import fattahAmil.BackendProject.Entity.Role;
import fattahAmil.BackendProject.Entity.User;
import fattahAmil.BackendProject.Repository.PostRepository;
import fattahAmil.BackendProject.Repository.RoleCostumeRepository;
import fattahAmil.BackendProject.Repository.RoleRepository;
import fattahAmil.BackendProject.Repository.UserRepository;
import fattahAmil.BackendProject.Service.UserInterface;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements UserInterface {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleCostumeRepository roleCostumeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;
    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>());
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(String id){
        return userRepository.findById(id);
    }
    @Override
    public ResponseEntity<?> getUserByEmail(String email){
            User user=userRepository.findByEmail(email).orElseThrow(()-> new NoSuchElementException("user not found"));

            UserResponse user1=new UserResponse(user.getId(),user.getFirstName(),user.getLastName(),user.getFirstName()+' '+user.getLastName(),user.getEmail(),user.getProfileImage(),roleCostumeRepository.getRole(user));
        return ResponseEntity.ok(user1);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addToUser(String username, String roleName) {
        if (!userRepository.findByEmail(username).isPresent()){
            throw new IllegalArgumentException("user email :"+username+" does not exists !");
        }
        Role role = roleRepository.findByName(roleName);
        if (role == null){
            throw new IllegalArgumentException("user role :"+roleName+" does not exists !");
        }
        User user=userRepository.findByEmail(username).get();
        user.getRoles().add(role);
    }

    @Override
    public ResponseEntity<?> getNumberOfLikesFollowersFollowing(String id) {
        NumberOfLikesFollowersFollowingDto number=new NumberOfLikesFollowersFollowingDto();
        number.setNumberOfFollowers(userRepository.counterOfNumberFollowers(id));
        number.setNumberOfFollowing(userRepository.counterOfNumberFollowing(id));
        number.setNumberOfLikes(userRepository.counterOfNumberLikesPerUser(id));


        return ResponseEntity.ok(number);
    }
    @Override
    public ResponseEntity<?> updateProfile(UserReqDto userReqDto){
        try{

            if (!userRepository.findById(userReqDto.getId()).isPresent()){
                throw new IllegalArgumentException("user does not exists !");
            }
            User user =userRepository.findById(userReqDto.getId()).get();
            if (userReqDto.getProfileImage().length>0){
                String name="avatar"+System.currentTimeMillis();
                MultipartFile multipartFile = new MockMultipartFile(name, userReqDto.getProfileImage());
                String filePath="Avatar"+System.currentTimeMillis()+"."+userReqDto.getFileType().substring(6);
                Path targetLocation = Path.of("C:\\Users\\fatta\\OneDrive\\Bureau\\Front-end-togetherly\\Front-end-Project\\src\\assets\\profileImage\\"+filePath);
                Files.copy(multipartFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                user.setProfileImage("assets/profileImage/"+filePath);
            }
            List<Role> role=roleCostumeRepository.getRole(user);
            role.clear();
            role.add(roleRepository.findByName(userReqDto.getRole()));
            if (Objects.equals(userReqDto.getRole(), "ROLE_STUDENT"))
                postRepository.deleteByUser(user);
            user.setRoles(new HashSet<>(role));
            user.setEmail(userReqDto.getEmail());
            user.setFirstName(userReqDto.getFirstName());
            user.setLastName(userReqDto.getLastName());
            user.setUserName(userReqDto.getFirstName()+userReqDto.getLastName());
            //addToUser(user.getEmail(),userReqDto.getRole());
            userRepository.save(user);
            return ResponseEntity.ok(userReqDto);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @Override
    public ResponseEntity<?> findAllUsers(){
        try{
            return ResponseEntity.ok(userRepository.findAll());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }




    /*@Override
    public ResponseEntity<?> followUser(FollowDto followDto) {
       try {

           follower.getFollowing().add(followed);
           followed.getFollowers().add(follower);
           userRepository.save(follower);
           userRepository.save(followed);
           return ResponseEntity.ok(follower);
       }catch (IllegalArgumentException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
        System.out.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }*/


}
