package fattahAmil.BackendProject.Repository;

import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;


@Repository
public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByEmail(String email);

    @Query(value ="SELECT count(*) FROM likes l,post p,users u where p.user_id=u.id and l.post_id_post=p.id_post and u.id= :userId",nativeQuery = true)
    long counterOfNumberLikesPerUser(@Param("userId") String Id);

    @Query(value = "SELECT count(*) FROM follow_relation where followed_id= :userId",nativeQuery = true)
    long counterOfNumberFollowers(@Param("userId") String Id);

    @Query(value = "SELECT count(*) FROM follow_relation where follower_id= :userId",nativeQuery = true)
    long counterOfNumberFollowing(@Param("userId") String Id);
}
