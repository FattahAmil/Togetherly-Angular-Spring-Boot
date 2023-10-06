package fattahAmil.BackendProject.Repository;

import fattahAmil.BackendProject.Dto.PostDtoOut;
import fattahAmil.BackendProject.Entity.Media;
import fattahAmil.BackendProject.Entity.Post;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> deleteByUser(User user);

    List<Post> findByUser(User user);


    @Query("SELECT p FROM Post p " +
            "WHERE p.user.id = :userId OR " +
            "p.user.id IN (SELECT fr.followed.id FROM FollowRelation fr WHERE fr.follower.id = :userId)")
    List<Post> findPostsAndUsersByUserAndFollowingUsers(@Param("userId") String Id);
}
