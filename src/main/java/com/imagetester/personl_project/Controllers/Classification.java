package com.imagetester.personl_project.Controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.imagetester.personl_project.Models.Images;
import com.imagetester.personl_project.Models.ImagesDTO;
import com.imagetester.personl_project.Models.Result;
import com.imagetester.personl_project.Models.UserDTO;
import com.imagetester.personl_project.Repos.ImagesRepo;
import com.imagetester.personl_project.Service.ImageClassifierService;
import com.imagetester.personl_project.Service.UserDetailsImp;

import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/classify")
public class Classification {
    @Autowired
    private ImageClassifierService imageClassifierService;

    @Autowired
    private ImagesRepo imagesRepo;

    @PostMapping("/predict")
    public ResponseEntity<?> handleUpload(@RequestParam("image") MultipartFile imageFile,
            @AuthenticationPrincipal UserDetailsImp user)
            throws IOException {
        try {
            // Convert MultipartFile to DJL Image (read from InputStream)
            Image image = ImageFactory.getInstance().fromInputStream(imageFile.getInputStream());

            // Run classification
            Result prediction = imageClassifierService.classify(image);

            // Update the constructor arguments to match the Images class constructor
            Images image_save = new Images(user.getUsername(), imageFile.getBytes(), imageFile.getOriginalFilename(),
                    prediction.getImage_type(), prediction.getResult());

            imagesRepo.save_details(image_save);

            return ResponseEntity.ok(prediction);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Prediction failed: " + e.getMessage());
        }
    }

    @GetMapping("/getNames")
    public ResponseEntity<?> getNames(@AuthenticationPrincipal UserDetailsImp user) {
        List<ImagesDTO> items = imagesRepo.ImageNames(user.getUsername());
        return ResponseEntity.ok().body(items);
    }

    @GetMapping("/getDetails/{id}")
    public ResponseEntity<?> getDetails(@PathVariable("id") int id, @AuthenticationPrincipal UserDetailsImp user) {
        ImagesDTO image;
        try {
            image = imagesRepo.getDetails(id, user.getUsername());
            // or PNG
            return new ResponseEntity<>(image, HttpStatus.OK);

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return ResponseEntity.badRequest().body("This is a bad request");
        }
    }

}
