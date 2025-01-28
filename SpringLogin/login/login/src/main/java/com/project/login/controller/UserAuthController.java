package com.project.login.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.login.dto.AuthResponse;
import com.project.login.dto.LoginRequest;
import com.project.login.dto.RegisterRequest;
import com.project.login.model.Role;
import com.project.login.security.JwtTokenProvider;
import com.project.login.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Controller
@RequestMapping("/api") 
@Tag(name = "User Auth Controller", description = "Kullanıcı kimlik doğrulama işlemleri")
public class UserAuthController {
	@Autowired
    private UserService userService;
	@Autowired
    private JwtTokenProvider jwtTokenProvider;

	
	@PostMapping("/register")
	@Operation(summary = "Kayıt ol", description = "Yeni kullanıcı kaydı yapar")
	public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterRequest  registerRequest, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        return new ResponseEntity<>("Geçersiz veri: " + bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
	    }
	    userService.saveUser(registerRequest); // Kullanıcıyı kaydediyoruz
	    return new ResponseEntity<>("Kayıt başarılı! Giriş yapabilirsiniz.", HttpStatus.OK);
	}

	
	// Kullanıcı girişi (login) işlemi
    @PostMapping("/login")
    @Operation(summary = "Giriş yap", description = "Kullanıcı giriş işlemi yapar")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // Kullanıcı adı ve şifre ile doğrulama yapılacak
    	if (userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword())) {
    		// Kullanıcı rolünü al
            Role userRole = userService.getUserRole(loginRequest.getUsername());
            // Kullanıcı ID'sini al
            Long userId = userService.getUserIdByUsername(loginRequest.getUsername());
            String token = jwtTokenProvider.createToken(loginRequest.getUsername(),userId, userRole);
            return ResponseEntity.ok(new AuthResponse(token));// Başarılı login, JWT token
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Geçersiz kullanıcı adı veya şifre!");
        }
	
    }
}
