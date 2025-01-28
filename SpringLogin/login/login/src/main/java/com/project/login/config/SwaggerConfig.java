package com.project.login.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(
    info = @Info(title = "Book Management API", version = "1.0", description = "API for managing books"),
    security = @SecurityRequirement(name = "bearerAuth") // Varsayılan olarak tüm endpoint'lere kimlik doğrulama zorunluluğu
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT" // JWT formatında Bearer Token kullanımı
)
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/api/**") // Tüm /api/** endpoint'lerini tarar
                .build();
    }
    
    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
                .group("Admin API") // Swagger'da bu grup adıyla görünür
                .pathsToMatch("/admin/**") // Sadece admin endpoint'lerini tarar
                .build();
    }
}