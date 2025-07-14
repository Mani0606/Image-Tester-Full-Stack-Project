package com.imagetester.personl_project.Controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class HomeController {
    @GetMapping("/hello")
    public String getMethodName() {
        return new String("Hello");
    }

    @PostMapping("/posting")
    public String postMethodName(@RequestBody String entity) {
        System.out.println(entity);
        return entity;
    }

}
