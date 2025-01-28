package com.project.login.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ReservationRequestDto {
	private Long userId;
	private Long bookId;
	private LocalDate dueDate; // Teslim tarihi
}
