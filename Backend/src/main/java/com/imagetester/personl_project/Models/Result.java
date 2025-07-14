package com.imagetester.personl_project.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {

    private String image_type;
    private double result;

    public Result(double result) {
        this.result = result;
        this.image_type = "Real";
        if (result > 0.5) {
            image_type = "FAKE";
        }
    }
}
