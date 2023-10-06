package fattahAmil.BackendProject.Entity;

import fattahAmil.BackendProject.Entity.enm.NotificationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Notification")
public class Notification {
    @PrePersist
    protected void onCreate(){
        this.createdAt=new Date(System.currentTimeMillis());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String message;

    private Date createdAt;

    private Long idPost;

    @Column(length = 50)
    private String emailFrom;

    @Column(length = 8)
    private NotificationType notificationType;

    private Boolean isRead;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User userFrom;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User recipient;

}
