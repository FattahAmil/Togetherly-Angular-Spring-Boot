package fattahAmil.BackendProject.Dto;


import fattahAmil.BackendProject.Entity.Comment;
import fattahAmil.BackendProject.Entity.Like;
import fattahAmil.BackendProject.Entity.Media;
import fattahAmil.BackendProject.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDtoOut {
    long id ;
    String content;
    Date createdAt;
    User user;
    List<Media> mediaList;
    List<Comment> comment;
    List<Like> like;
    boolean event;
}
