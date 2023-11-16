package com.worker_microservice.ordermicroservice.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.worker_microservice.ordermicroservice.model.Image;
import com.worker_microservice.ordermicroservice.repository.ImageRepository;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    private final String Folder_Path = "C:/Coding/web development/SuperMarket App/backend/supermarket backend/data/supermarket-image-database/";

    public String uploadImage(MultipartFile file, String fileName) throws IOException {

        String file_path = Folder_Path + fileName;

        Image image = new Image();

        image.setName(fileName);
        image.setType(file.getContentType());
        image.setPath(file_path);

        file.transferTo(new File(file_path));

        return imageRepository.save(image) != null ? "Image uploaded successfully" : "Upload failed!";
    }

    public byte[] getImage(String fileName) throws IOException {
        Optional<Image> image = imageRepository.findByName(fileName);

        if (!image.isPresent())
            return null;

        String file_path = image.get().getPath();
        return Files.readAllBytes(new File(file_path).toPath());
    }

    public Boolean deleteImage(String name) {
        Optional<Image> isExist = imageRepository.findById(name);

        if (isExist.isPresent()) {
            imageRepository.deleteById(isExist.get().getId());
            return true;
        }

        return false;
    }

}
