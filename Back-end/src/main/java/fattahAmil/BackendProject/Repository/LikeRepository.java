package fattahAmil.BackendProject.Repository;

import fattahAmil.BackendProject.Entity.Like;
import fattahAmil.BackendProject.Entity.Post;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
    List<Like> findByPost(Post post);
    List<Like> findByUsers(User user);

    void deleteByPostId(Long postId);

    boolean existsByPostAndUsers(Post post, User user);

    @Query(value = "SELECT l.id_like FROM likes l "+
            "WHERE l.post_id_post= :idPost AND users_id =:idUser",nativeQuery = true)
    Long findIdByPostAndUsers(@Param("idUser") String idUser, @Param("idPost") long idPost);

    List<Like> findByPostId(Long postId);
}
