package fattahAmil.BackendProject.Controller;

import fattahAmil.BackendProject.Dto.*;
import fattahAmil.BackendProject.Repository.UserRepository;
import fattahAmil.BackendProject.Service.Implement.CommentService;
import fattahAmil.BackendProject.Service.Implement.LikeService;
import fattahAmil.BackendProject.Service.Implement.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    private final LikeService likeService;

    private final CommentService commentService;

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/create")
    public ResponseEntity<?> createPostWithMedia(@RequestBody PostDto postDto) {
        return ResponseEntity.ok(postService.createPostWithMedia(postDto));
    }

    @GetMapping("/PostByFollowingUser")
    public ResponseEntity<?> ShowPostByFollowingUser(){
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @PostMapping("/comment")
    public ResponseEntity<?> commentPost(@RequestBody CommentDto commentDto){
        return ResponseEntity.ok(commentService.createComment(commentDto));
    }
    @PostMapping("/deleteComment")
    public ResponseEntity<?> deleteCommentPost(@RequestBody IdCommentDto idCommentDto){
        return ResponseEntity.ok(commentService.deleteComment(idCommentDto.getIdComment()));
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeUnlikePost(@RequestBody LikeDto likeDto){
        return ResponseEntity.ok(likeService.likeUnlikePost(likeDto));
    }
    @PostMapping("/delete")
    public ResponseEntity<?> deletePost(@RequestBody PostByIdDto postByIdDto){
        return ResponseEntity.ok(postService.deletePost(postByIdDto.getIdPost()));
    }

    @PostMapping("/PostById")
    public ResponseEntity<?> postById(@RequestBody PostByIdDto postByIdDto){
        return ResponseEntity.ok(postService.postById(postByIdDto));
    }

    @GetMapping("/PostUser/{id}")
    public ResponseEntity<?> findPostsAndUsersByUserAndFollowingUsers(@PathVariable("id")String id){
        return ResponseEntity.ok(postService.getPostAndUsersByUserAndFollowedUser(id));
    }


}
