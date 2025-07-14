package com.imagetester.personl_project.Models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Images")
public class Images {
    private int id;
    private String Email;
    private byte[] imageData;
    private String image_name;
    private String result;
    private Double probablilty;

    public Images(String Email, byte[] imageData, String image_name, String result, Double prob) {
        this.Email = Email;
        this.imageData = imageData;
        this.image_name = image_name;
        this.result = result;
        this.probablilty = prob;
    }
}
