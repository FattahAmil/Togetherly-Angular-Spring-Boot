package fattahAmil.BackendProject.Entity;

import fattahAmil.BackendProject.Entity.enm.MessageType;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.apachecommons.CommonsLog;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ChatMessage")
public class ChatMessage {
    @PrePersist
    protected void onCreate(){
        this.createdAt=new Date(System.currentTimeMillis());
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 6)
    private MessageType type;

    @Column(length = 251)
    private String content;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User sender;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User recipient;

    private Date createdAt;


}

