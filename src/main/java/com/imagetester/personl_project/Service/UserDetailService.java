package com.imagetester.personl_project.Service;

import com.imagetester.personl_project.Models.UserDTO;
import com.imagetester.personl_project.Models.Users;
import com.imagetester.personl_project.Repos.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    UsersRepo usersRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usersRepo.findUserbyEmail(username);
        return UserDetailsImp.build(user);
    }
}
