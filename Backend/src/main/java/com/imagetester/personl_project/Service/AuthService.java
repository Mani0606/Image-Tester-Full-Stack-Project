package com.imagetester.personl_project.Service;


import com.imagetester.personl_project.Models.Users;
import com.imagetester.personl_project.Repos.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsersRepo usersRepo;

    public boolean doesEmailExist(String Email){
        return usersRepo.doesEmailExist(Email);
    }

    public void save_user(Users user){
        usersRepo.saveUser(user);
    }
}
