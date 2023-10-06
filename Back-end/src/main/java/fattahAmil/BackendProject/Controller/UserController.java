package fattahAmil.BackendProject.Controller;


import fattahAmil.BackendProject.Dto.FollowDto;
import fattahAmil.BackendProject.Dto.RecipientSenderDto;
import fattahAmil.BackendProject.Dto.UserByIdReq;
import fattahAmil.BackendProject.Dto.UserReqDto;
import fattahAmil.BackendProject.Repository.FollowRelationRepository;
import fattahAmil.BackendProject.Service.Implement.FollowService;
import fattahAmil.BackendProject.Service.Implement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final FollowService followService;
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") String id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PostMapping("/follow")
    public ResponseEntity<?> followUser(@RequestBody FollowDto followDto){
        return ResponseEntity.ok(followService.follow(followDto));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserReqDto userReqDto){
        return ResponseEntity.ok(userService.updateProfile(userReqDto));
    }

    @PostMapping("/getNumbers")
    public ResponseEntity<?> getNumbersOfLikesFollowersFollowing(@RequestBody UserByIdReq userByIdReq){
        return ResponseEntity.ok(userService.getNumberOfLikesFollowersFollowing(userByIdReq.getIdUser()));
    }

    @GetMapping("/notFollowed/{id}")
    public ResponseEntity<?> notFollowed(@PathVariable("id")String id){
        return ResponseEntity.ok(followService.notFollowed(id));
    }

    @GetMapping("/getFriends/{id}")
    public ResponseEntity<?> findUserFriend(@PathVariable("id")String id){
        return ResponseEntity.ok(followService.findUserFriend(id));
    }
    @PostMapping("/isFriend")
    public ResponseEntity<?> checkIfFriend(@RequestBody RecipientSenderDto recipientSenderDto){
        return ResponseEntity.ok(followService.checkIfFriend(recipientSenderDto.getSenderId(), recipientSenderDto.getRecipientId()));
    }

    @PostMapping("/isFollow")
    public  ResponseEntity<?> checkIfFollow(@RequestBody FollowDto followDto){
        return ResponseEntity.ok(followService.checkIfFollow(followDto));
    }

    @GetMapping("/findAllUsers")
    public ResponseEntity<?> findAllUsers(){
        return ResponseEntity.ok(userService.findAllUsers());
    }
}
