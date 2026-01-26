package com.auth.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {

        return new Cloudinary(
                ObjectUtils.asMap(
                        "cloud_name", "dje5ue79u",
                        "api_key", "173828562644592",
                        "api_secret", "VVcJaH3C4iu7YHEN5zcD5GyKLh8",
                        "secure", true
                )
        );
    }
}
