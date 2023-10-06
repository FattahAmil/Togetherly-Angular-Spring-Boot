package fattahAmil.BackendProject.Service.SecurityService;

import fattahAmil.BackendProject.Dto.AuthenticationRequest;
import fattahAmil.BackendProject.Dto.AuthenticationResponse;
import fattahAmil.BackendProject.Dto.RegisterRequest;
import fattahAmil.BackendProject.Entity.Role;
import fattahAmil.BackendProject.Entity.User;
import fattahAmil.BackendProject.Repository.RoleCostumeRepository;
import fattahAmil.BackendProject.Repository.UserRepository;
import fattahAmil.BackendProject.Service.Implement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleCostumeRepository roleCostumeRepository;
    private final UserService userService;

    public ResponseEntity<?> register(RegisterRequest registerRequest){
        try {
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
                throw new IllegalArgumentException("user with this email : "+registerRequest.getEmail()+" exist");
            }
            userService.saveUser(new User(registerRequest.getFirstName(),registerRequest.getLastName(),registerRequest.getPassword(),registerRequest.getEmail(),new HashSet<>()));
            userService.addToUser(registerRequest.getEmail(),"ROLE_STUDENT");//default role
            User user=userRepository.findByEmail(registerRequest.getEmail()).orElseThrow();
            return  ResponseEntity.ok(user);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }

    }
    public ResponseEntity<?> authenticate(AuthenticationRequest authenticationRequest){
        try {
            User user=userRepository.findByEmail(authenticationRequest.getEmail()).orElseThrow(()-> new NoSuchElementException("user not found"));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),authenticationRequest.getPassword()));
            List<Role> role=null;
            if (user!=null){
                role= roleCostumeRepository.getRole(user);
            }
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            Set<Role>set=new HashSet<>();
            role.stream().forEach(c->{set.add(new Role(c.getName()));
                authorities.add(new SimpleGrantedAuthority(c.getName()));
            });
            user.setRoles(set);
            set.stream().forEach(i->authorities.add(new SimpleGrantedAuthority(i.getName())));
            var jwtAccessToken=jwtService.generateToken(user,authorities);
            var jwtRefreshToken=jwtService.generateRefreshToken(user,authorities);
            return ResponseEntity.ok(AuthenticationResponse.builder().access_token(jwtAccessToken).refresh_token(jwtRefreshToken).email(user.getEmail()).user_name(user.getFirstName()+" "+user.getLastName()).build());
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body("invalid credential : "+ e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());


        }
    }
}
