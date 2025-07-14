package com.imagetester.personl_project.Repos;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.imagetester.personl_project.Models.Images;
import com.imagetester.personl_project.Models.ImagesDTO;

import ai.djl.modality.cv.Image;

@Repository
@SuppressWarnings("deprecation")

public class ImagesRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String save_details(Images image) {
        String query = "INSERT INTO Images (Email, imageData, image_name, result, probablilty) VALUES (?, ?, ?, ?, ?)";
        int row = jdbcTemplate.update(query, image.getEmail(), image.getImageData(), image.getImage_name(),
                image.getResult(), image.getProbablilty());
        return "Data is Saved";
    }

    @SuppressWarnings("deprecation")
    public List<ImagesDTO> ImageNames(String Email) {
        String query = "SELECT id,image_name FROM Images WHERE Email=(?)";

        List<ImagesDTO> items = jdbcTemplate.query(query, new Object[] { Email }, (rs, rsNum) -> new ImagesDTO(
                rs.getInt("id"),
                rs.getString("image_name")));
        return items;
    }

    public ImagesDTO getDetails(int id, String Email) {
        String query = "SELECT id, image_name, result, probablilty, imageData FROM Images WHERE Email = ? AND id = ?";

        ImagesDTO images = jdbcTemplate.queryForObject(query, new Object[] { Email, id }, (rs, rsNum) -> new ImagesDTO(
                rs.getInt("id"),
                rs.getString("image_name"),
                rs.getBytes("imageData"),
                rs.getString("result"),
                rs.getDouble("probablilty")));
        return images;
    }

}
