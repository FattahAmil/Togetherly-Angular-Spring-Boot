package fattahAmil.BackendProject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    private User user;

   @JsonIgnore
    @ManyToOne
    private Post post;


    @Column(length = 50)
    private String mediaData;


    @Column(name = "file_name",length = 80)
    private String fileName;

    @Column(name = "file_type",length = 10)
    private String fileType;

    @Column(name = "file_size",length = 20)
    private Long fileSize;



}
