package com.imagetester.personl_project.Repos;


import com.imagetester.personl_project.Models.UserDTO;
import com.imagetester.personl_project.Models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsersRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String saveUser(Users user){
        String query = "INSERT INTO Users(Email,UserName,Password,PhoneNumber) VALUES(?,?,?,?)";

        try {
            int rows = jdbcTemplate.update(query,user.getEmail(),user.getUserName(),user.getPassword(),user.getPhoneNumber());
        } catch (DataAccessException e) {
            System.out.println(e.fillInStackTrace());
            throw new RuntimeException(e);
        }

        return "User Saved Successfully";
    }

    public Users findUserbyEmail(String Email){
        String query = "SELEct * FROM Users WHERE Email=(?)";

        @SuppressWarnings("deprecation")
        Users user = jdbcTemplate.queryForObject(query,new Object[]{Email},(rs, rowNum) -> new Users(
                rs.getString("UserName"),
                rs.getString("Email"),
                rs.getString("Password"),
                rs.getString("PhoneNumber")));
        return user;
    }

    public boolean doesEmailExist(String Email){
        String sql = "SELECT COUNT(1) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, Email);
        return count != null && count > 0;
    }
}
