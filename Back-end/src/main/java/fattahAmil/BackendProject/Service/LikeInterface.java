package fattahAmil.BackendProject.Service;

import fattahAmil.BackendProject.Dto.LikeDto;
import fattahAmil.BackendProject.Entity.Like;
import fattahAmil.BackendProject.Entity.Post;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LikeInterface {
    ResponseEntity<?> likeUnlikePost(LikeDto likeDto) ;
    void unlikePost(Long likeId) throws Exception;
    List<Like> getLikesForPost(Post post);
    List<Like> getLikesByUser(User user);

}
