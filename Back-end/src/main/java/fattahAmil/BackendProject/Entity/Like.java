package fattahAmil.BackendProject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Likes")
public class Like {
    @PrePersist
    protected void onCreate(){
        this.created_at=new Date(System.currentTimeMillis());
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLike;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(referencedColumnName = "idPost")
    private Post post;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User users ;

    private Date created_at;
}
