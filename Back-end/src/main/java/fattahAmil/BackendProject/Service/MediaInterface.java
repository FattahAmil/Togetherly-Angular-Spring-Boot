package fattahAmil.BackendProject.Service;

import fattahAmil.BackendProject.Entity.Media;
import fattahAmil.BackendProject.Entity.Post;
import fattahAmil.BackendProject.Entity.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MediaInterface {
    Media uploadMedia(MultipartFile file);
    Media getMediaById(Long mediaId) throws ChangeSetPersister.NotFoundException;
    List<Media> getAllMediaForUser(User user);
    List<Media> getAllMediaForPost(Post post);
}
