package com.imagetester.personl_project.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users",uniqueConstraints = {
        @UniqueConstraint(columnNames = "id"),
        @UniqueConstraint(columnNames = "Email")
})
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotBlank
    @NonNull
    @Email
    @Column(name = "Email")
    private String Email;

    @NotBlank
    @NonNull
    @Column(name = "UserName")
    @Size(max = 15,min = 4)
    private String UserName;

    @NotBlank
    @NonNull
    @Column(name = "PhoneNumber")
    @Size(max = 10,min = 10)
    private String PhoneNumber;

    @NotBlank
    @Column(name = "Password")
    @Size(max = 14)
    @Size(min = 8)
    @JsonIgnore
    private String Password;

    public Users(String userName, String email, String password,String phoneNumber) {
        this.Email=email;
        this.Password=password;
        this.UserName=userName;
        this.PhoneNumber = phoneNumber;
    }
}
