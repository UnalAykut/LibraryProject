package com.project.login.dto;



import com.project.login.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
		private Long id;
		private String username;
		private String email;
		private Role role;  // Varsayılan olarak USER atanır

}
