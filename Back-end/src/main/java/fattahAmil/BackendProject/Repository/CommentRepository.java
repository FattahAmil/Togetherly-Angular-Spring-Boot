package fattahAmil.BackendProject.Repository;

import fattahAmil.BackendProject.Entity.Comment;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    void deleteByPostId(Long postId);

    List<Comment> findByPostId(Long postId);

    List<Comment> findByUsers(User user);
}
