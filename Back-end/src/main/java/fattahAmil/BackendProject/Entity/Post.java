package fattahAmil.BackendProject.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Post")
public class Post {
    @PrePersist
    protected void onCreate(){
        this.created_at=new Date(System.currentTimeMillis());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPost")
    private Long id;

    @Column(nullable = false,length = 101)
    private String content;

    private Date created_at;

    @Column(nullable = false)
    private boolean isEvent;

    @ManyToOne
    @JoinColumn( referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Media> mediaList = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comment=new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Like> like=new ArrayList<>();


    public void addMedia(Media media) {
        mediaList.add(media);
        media.setPost(this);
    }


}
