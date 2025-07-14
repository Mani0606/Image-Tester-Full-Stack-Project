package com.imagetester.personl_project.Controllers;

import com.imagetester.personl_project.Config.JwtUtils;
import com.imagetester.personl_project.Models.LoginDTO;
import com.imagetester.personl_project.Models.SignupDTO;
import com.imagetester.personl_project.Models.Users;
import com.imagetester.personl_project.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<?> Create_User(@Valid @RequestBody SignupDTO signup) {
        if (authService.doesEmailExist(signup.getEmail())) {
            ResponseEntity.ok().body("User Already Exist");
        }
        Users user = new Users(signup.getUserName(), signup.getEmail(), passwordEncoder.encode(signup.getPassword()),
                signup.getPhoneNumber());
        authService.save_user(user);
        return ResponseEntity.ok().body("User is Saved");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login_user(@Valid @RequestBody LoginDTO login) {
        System.out.println(login.getEmail() + login.getPassword());
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Given Credentais are wrong");
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateTokenFromUsername(userDetails);
        return ResponseEntity.ok().body(jwt);
    }

    @GetMapping("/csrf-token")
    public CsrfToken csrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    }
}
