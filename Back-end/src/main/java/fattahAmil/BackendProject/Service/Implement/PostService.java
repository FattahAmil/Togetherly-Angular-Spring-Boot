package fattahAmil.BackendProject.Service.Implement;

import fattahAmil.BackendProject.Dto.MediaDto;
import fattahAmil.BackendProject.Dto.PostByIdDto;
import fattahAmil.BackendProject.Dto.PostDto;
import fattahAmil.BackendProject.Dto.PostDtoOut;
import fattahAmil.BackendProject.Entity.Media;
import fattahAmil.BackendProject.Entity.Post;
import fattahAmil.BackendProject.Entity.User;
import fattahAmil.BackendProject.Repository.*;
import fattahAmil.BackendProject.Service.PostInterface;
import org.apache.commons.io.FilenameUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Blob;
import java.util.*;

@Service
public class PostService implements PostInterface {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    private final MediaService mediaService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private LikeRepository likeRepository;

    public PostService(MediaService mediaService) {
        this.mediaService = mediaService;
    }


    @Override
    public ResponseEntity<?> createPostWithMedia(PostDto postDto) {
        try{
            Post post = new Post();
            post.setContent(postDto.getContent());
            post.setEvent(postDto.isEvent());
            if (!userRepository.findById(postDto.getId()).isPresent()){
                throw new IllegalArgumentException("user does not exists !");
            }
            User user =userRepository.findById(postDto.getId()).get();
            post.setUser(user);
            int i=0;
            List<Media> mediaList = new ArrayList<>();
            for (MediaDto mediaDto : postDto.getMediaList()) {
                Media media= new Media();
                MultipartFile multipartFile = new MockMultipartFile(mediaDto.getFileName(),mediaDto.getFileContent());
                String filePath="file"+i+System.currentTimeMillis()+"."+mediaDto.getFileType().substring(6);
                i++;
                 // Copy file to the target location (Replacing existing file with the same name)
                Path targetLocation = Path.of("C:\\Users\\fatta\\OneDrive\\Bureau\\Front-end-togetherly\\Front-end-Project\\src\\assets\\media\\"+filePath);

                Files.copy(multipartFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                media.setMediaData(filePath);

                /*byte[] bytes= mediaDto.getFileContent();
                media.setMediaData(bytes);*/
               /* FileInputStream inputStream = new FileInputStream(mediaDto.getFileContent());
                MultipartFile multipartFile = new MockMultipartFile(mediaDto.getFileContent(), inputStream);
                Media media=mediaService.uploadMedia(multipartFile);*/
                media.setFileName(mediaDto.getFileName());
                media.setFileType(mediaDto.getFileType().substring(6));
                media.setFileSize(mediaDto.getFileSize());
                media.setUser(user);
                media.setPost(post);

                mediaList.add(media);
            }
            post.setMediaList(mediaList);
            postRepository.save(post);
            return ResponseEntity.ok("post has been created");
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public Post createPostWithMedia(Post post, List<Media> mediaList) {
        post.setMediaList(mediaList);

        return postRepository.save(post);
    }

    @Override
    public ResponseEntity<?> getPostAndUsersByUserAndFollowedUser(String id){
        try{
            if (!userRepository.findById(id).isPresent()){
                throw new IllegalArgumentException("user does not exists !");
            }
            List<Post> postsUser=postRepository.findPostsAndUsersByUserAndFollowingUsers(id);

            return ResponseEntity.ok(postsUser);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> postById(PostByIdDto postByIdDto){
        try{
            if (!postRepository.findById(postByIdDto.getIdPost()).isPresent()){
                    throw new IllegalArgumentException("post does not exists !");
            }

            return ResponseEntity.ok(postRepository.findById(postByIdDto.getIdPost()).get());
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @Override
    public ResponseEntity<?> deletePost(Long postId){
        try{
            if (!postRepository.findById(postId).isPresent()){
                throw new IllegalArgumentException("post does not exists !");
            }
            Post existingPost = postRepository.findById(postId).get();
            postRepository.deleteById(postId);
            return ResponseEntity.ok("post has been deleted");
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public Post updatePost(Long postId, Post updatedPost,User user) throws Exception {

        Post existingPost = postRepository.findById(postId)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        if (!existingPost.getUser().equals(user) || user.getRoles().stream().noneMatch(role -> role.getName().equals("ROLE_ADMIN"))){
            throw new Exception("this is not you post and you are not an admin");
        }



        existingPost.setContent(updatedPost.getContent());

        if (!updatedPost.getMediaList().isEmpty()) {
            existingPost.getMediaList().clear();
            existingPost.getMediaList().addAll(updatedPost.getMediaList());
        }

        return postRepository.save(existingPost);
    }


    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getPostsByUser(User user) {
        return postRepository.findByUser(user);
    }


}
