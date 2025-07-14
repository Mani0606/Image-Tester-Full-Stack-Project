package com.imagetester.personl_project.Service;

import ai.djl.*;
import ai.djl.Application;
import ai.djl.MalformedModelException;
import ai.djl.inference.Predictor;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import ai.djl.modality.cv.transform.Resize;
import ai.djl.modality.cv.transform.ToTensor;
import ai.djl.modality.cv.translator.ImageClassificationTranslator;
import ai.djl.repository.zoo.*;
import ai.djl.training.util.ProgressBar;
import ai.djl.translate.Translator;
import ai.djl.translate.TranslatorContext;
import jakarta.annotation.PostConstruct;
import ai.djl.translate.Pipeline;
import ai.djl.translate.TranslateException;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.imagetester.personl_project.Models.Result;

@Component
public class ImageClassifierService {

    private ZooModel<Image, Classifications> model;

    public void loadModel() throws IOException, MalformedModelException, ModelNotFoundException {

        Criteria<Image, Classifications> criteria = Criteria.builder()
                .setTypes(Image.class, Classifications.class)
                .optApplication(Application.CV.IMAGE_CLASSIFICATION)
                .optModelPath(Paths.get(
                        "/Users/manideepak/Documents/Zoom/demo/src/main/java/com/Experimental/demo/Model/cifake_two_stream_final_jit3.pt"))
                .optTranslator(new SimpleTranslator())
                .optEngine("PyTorch")
                .build();
        this.model = ModelZoo.loadModel(criteria);
    }

    public Result classify(Image image) throws TranslateException {
        try {
            loadModel();
        } catch (IOException | MalformedModelException | ModelNotFoundException e) {
            throw new RuntimeException("Failed to load model", e);
        }
        try (Predictor<Image, Classifications> predictor = model.newPredictor()) {
            Classifications classifications = predictor.predict(image);
            return new Result(classifications.best().getProbability());
        }
    }

    private static class SimpleTranslator implements Translator<Image, Classifications> {
        @Override
        public Classifications processOutput(TranslatorContext ctx, ai.djl.ndarray.NDList list) {
            List<String> synset = Arrays.asList("FAKE", "REAL");
            return new Classifications(synset, list.get(0));
        }

        @Override
        public ai.djl.ndarray.NDList processInput(TranslatorContext ctx, Image input) {
            Pipeline pipeline = new Pipeline();
            pipeline.add(new Resize(256))
                    .add(new ToTensor());
            ai.djl.ndarray.NDManager manager = ctx.getNDManager();
            ai.djl.ndarray.NDArray array = input.toNDArray(manager);
            ai.djl.ndarray.NDList ndList = new ai.djl.ndarray.NDList(array);
            return pipeline.transform(ndList);
        }
    }

}
