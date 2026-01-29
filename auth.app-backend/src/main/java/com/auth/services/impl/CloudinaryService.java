package com.auth.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    
    // UPLOAD FILE
    
    public Map<String, Object> uploadFile(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "auto"
                )
        );
    }

    
    // DELETE FILE  
    
    public void deleteFile(String publicId) {
        try {
            Map<String, Object> options = ObjectUtils.asMap(
                    "resource_type", "raw"
            );

            cloudinary.uploader().destroy(publicId, options);

        } catch (Exception e) {
            throw new RuntimeException("Cloudinary delete failed", e);
        }
    }


}
