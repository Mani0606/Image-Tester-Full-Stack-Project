package com.imagetester.personl_project.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDTO {
    private String UserName;
    private String Email;
    private String PhoneNumber;
    private String Password;
}
