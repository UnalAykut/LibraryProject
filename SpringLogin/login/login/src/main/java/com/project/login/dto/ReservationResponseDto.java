package com.project.login.dto;

import java.time.LocalDate;

import lombok.Data;
@Data
public class ReservationResponseDto {
	private String bookTitle; // Kitap adı
    private LocalDate reservationDate; // Rezervasyon tarihi
    private LocalDate dueDate; // İade tarihi
    private String status;
    private int overdueDays; // Geciken gün sayısı
    private double currentPenalty; // Anlık ceza
    private int daysLeft; // İade tarihine kalan gün sayısı
    private int extensionCount;
}
