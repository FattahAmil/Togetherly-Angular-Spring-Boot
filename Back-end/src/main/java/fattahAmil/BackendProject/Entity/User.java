package fattahAmil.BackendProject.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Users")
public class User implements UserDetails {
    @PrePersist
    protected void onCreate(){
        this.created_at=new Date(System.currentTimeMillis());
    }
    @PreUpdate
    protected void onUpdate(){
        this.updated_at=new Date(System.currentTimeMillis());
    }

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Column(length = 20)
    private String firstName;

    @Column(length = 20)
    private String lastName;

    @Column(length = 50)
    private String profileImage;

    @Column(length = 50)
    private String userName;


    private String password;

    @Column(length = 100)
    private String email;

    private Date created_at;

    private Date updated_at;

    @ManyToMany
    @JoinTable(name = "User_role",joinColumns = @JoinColumn(name = "User_id"),inverseJoinColumns =@JoinColumn(name = "Role_id") )
    private Set<Role> roles = new HashSet<>();



    public User(String id, String firstName, String lastName, String password, String email, Set<Role> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = firstName+lastName;
        this.profileImage="assets/profileImage/avatar.png";
        this.password = password;
        this.email = email;
        this.roles = roles;
    }
    public User( String firstName, String lastName, String password, String email, Set<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = firstName+lastName;
        this.profileImage="assets/profileImage/avatar.png";
        this.password = password;
        this.email = email;
        this.roles = roles;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities=new ArrayList<>();
        roles.stream().forEach(i->authorities.add(new SimpleGrantedAuthority(i.getName())));
        return List.of(new SimpleGrantedAuthority(authorities.toString()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
