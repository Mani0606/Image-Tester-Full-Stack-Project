package com.imagetester.personl_project.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagesDTO {
    private int id;
    private String Image_name;
    private byte[] Image_Data;
    private String Result;
    private Double prob;

    public ImagesDTO(int id, String Image_name) {
        this.id = id;
        this.Image_name = Image_name;
    }

}
