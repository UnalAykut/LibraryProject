package com.project.login.dto;

import lombok.AllArgsConstructor;


@AllArgsConstructor
public class AdminProfileResponseDto {
	private String username;
	
	public String getUsername() {
        return username;
    }
	
}
