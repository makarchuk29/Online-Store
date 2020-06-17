package com.shop.onlinestore.config;

import com.shop.onlinestore.entity.Product;
import com.shop.onlinestore.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(ProductCategory.class);
        config.getCorsRegistry().addMapping("/**").allowedOrigins("http://localhost:4200");
    }
}
