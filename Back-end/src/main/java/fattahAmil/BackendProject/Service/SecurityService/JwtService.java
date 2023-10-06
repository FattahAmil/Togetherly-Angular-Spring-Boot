package fattahAmil.BackendProject.Service.SecurityService;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import fattahAmil.BackendProject.Entity.User;
import fattahAmil.BackendProject.Repository.RoleCostumeRepository;
import fattahAmil.BackendProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


@Service
public class JwtService {
    @Value("${secret.key}")
    private String secretKey;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleCostumeRepository roleCostumeRepository;

    public String generateToken(User user, Collection<SimpleGrantedAuthority> authorities){
        Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
        return JWT.create().withSubject(user.getEmail()).withExpiresAt(new Date(System.currentTimeMillis()+86400000))
                .withClaim("roles",authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
    }
    public String generateRefreshToken(User user, Collection<SimpleGrantedAuthority> authorities){
        Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
        return JWT.create().withSubject(user.getEmail()).withExpiresAt(new Date(System.currentTimeMillis()+70*60*1000))
                .sign(algorithm);
    }
}
