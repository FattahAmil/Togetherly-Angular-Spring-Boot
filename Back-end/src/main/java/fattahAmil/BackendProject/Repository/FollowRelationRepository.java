package fattahAmil.BackendProject.Repository;

import fattahAmil.BackendProject.Entity.FollowRelation;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRelationRepository extends JpaRepository<FollowRelation,Long> {
    List<FollowRelation> findByFollower(User follower);
    List<FollowRelation> findByFollowed(User followed);

    void deleteByFollowerAndFollowed(User follower, User followed);

    @Query(value = "SELECT u FROM User u WHERE u.id <> :followerId AND u.id NOT IN" +
            "(SELECT fr.followed.id FROM FollowRelation fr WHERE fr.follower.id =  :followerId)")
    List<User> findUsersNotFollowedBy(@Param("followerId") String followerId);

    @Query("SELECT u" +
            " FROM FollowRelation fr" +
            " JOIN User u ON fr.followed.id = u.id" +
            " WHERE fr.follower.id = :followerId " +
            " AND fr.followed.id IN (" +
            " SELECT fr2.follower.id" +
            " FROM FollowRelation fr2" +
            " JOIN User u2 ON fr2.follower.id = u2.id)")
    List<User>findUserFriend(@Param("followerId") String followerId);
    Optional<FollowRelation> findByFollowerAndFollowed(User follower, User followed);
}
