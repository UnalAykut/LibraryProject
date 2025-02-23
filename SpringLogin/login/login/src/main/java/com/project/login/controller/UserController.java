package com.project.login.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.login.dto.UpdateUserRequestDto;
import com.project.login.dto.UserDto;
import com.project.login.dto.UserProfileResponseDto;
import com.project.login.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/user")
@Tag(name = "User Controller", description = "Kullanıcı işlemleri AAA")
public class UserController {
	private UserService userService;
	
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/get/profile")
	public ResponseEntity<UserProfileResponseDto> getUserProfile() {
		Long currentUserId = userService.getCurrentUserId();
		return ResponseEntity.ok(userService.getUserProfile(currentUserId));
	}

	@PutMapping("/profile") // Kullanıcı kendi profilini güncellemek için
	public ResponseEntity<UserDto> updateUserProfile(
	        @RequestBody UpdateUserRequestDto updateUserRequestDto) {
	    // Şu an oturum açmış olan kullanıcının ID'sini alıyoruz
	    Long currentUserId = userService.getCurrentUserId();

	    // Kullanıcının kendi profilini güncellemesini sağlıyoruz
	    UserDto updatedUser = userService.updateUserProfile(currentUserId, updateUserRequestDto);
	    return ResponseEntity.ok(updatedUser);
	}
}
