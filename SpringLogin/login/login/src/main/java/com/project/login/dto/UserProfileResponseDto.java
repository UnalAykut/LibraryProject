package com.project.login.dto;

public class UserProfileResponseDto {
	private String username;
	private String email;
	private String password;
	
	
	public UserProfileResponseDto(String username, String password, String email) {
		this.username = username;
	    this.email = email;
	    this.password=password;
	}

	public String getEmail() {
		return email;
	}

	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	
}
