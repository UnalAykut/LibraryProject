package com.project.login.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ReservationAdminResponseDto {
	private Long reservationId; // Rezervasyon ID'si
    private Long userId; // Kullanıcı ID'si
    private Long bookId; // Kitap ID'si
    private String bookTitle; // Kitap adı
    private LocalDate reservationDate; // Rezervasyon tarihi
    private LocalDate dueDate; // İade tarihi
    private int extensionCount; // Uzatma sayısı
	private double penalty; //gecikme cezası
    private int overdueDays=0; // Gecikme süresi (gün olarak)
}
