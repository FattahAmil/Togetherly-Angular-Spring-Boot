package fattahAmil.BackendProject.Service;

import fattahAmil.BackendProject.Dto.FollowDto;

import org.springframework.http.ResponseEntity;

public interface FollowInterface {

    public ResponseEntity<?> notFollowed(String id);

    public ResponseEntity<?> checkIfFriend(String idUser1,String idUser2);

    public ResponseEntity<?> follow(FollowDto followDto);

    public ResponseEntity<?> checkIfFollow(FollowDto followDto);
    public ResponseEntity<?> findUserFriend(String id);
}
