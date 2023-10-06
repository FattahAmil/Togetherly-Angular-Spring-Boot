package fattahAmil.BackendProject.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Roles")
public class Role {
    @PrePersist
    protected void onCreate(){
        this.created_at=new Date(System.currentTimeMillis());
    }
    @PreUpdate
    protected void onUpdate(){
        this.updated_at=new Date(System.currentTimeMillis());
    }

    @Id
    @SequenceGenerator(name = "role_sequence"
            ,sequenceName = "role_sequence"
            ,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.AUTO
            ,generator = "role_sequence")
    private long id;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String description;

    private Date updated_at;

    private Date created_at;

    @ManyToMany(mappedBy = "roles")
    @Fetch(value = FetchMode.SELECT)
    @JsonIgnore
    private Set<User> user=new HashSet<>();

    public Role(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Role(String name, String description) {

        this.name = name;
        this.description = description;
    }

    public Role(String name) {
        this.name = name;
    }
}
