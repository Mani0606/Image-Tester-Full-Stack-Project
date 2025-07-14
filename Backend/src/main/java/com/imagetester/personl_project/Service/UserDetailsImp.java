package com.imagetester.personl_project.Service;

import com.imagetester.personl_project.Models.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsImp implements UserDetails {

    private String UserName;
    private  String Email;
    private String Password;

    public static UserDetailsImp build(Users user){
        return new UserDetailsImp(user.getUserName(),user.getEmail(),user.getPassword());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return this.Password;
    }

    @Override
    public String getUsername() {
        return this.Email;
    }
}
