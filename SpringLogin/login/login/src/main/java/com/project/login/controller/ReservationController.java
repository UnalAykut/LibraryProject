package com.project.login.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.login.dto.ReservationAdminResponseDto;
import com.project.login.dto.ReservationRequestDto;
import com.project.login.dto.ReservationResponseDto;
import com.project.login.service.LogService;
import com.project.login.service.ReservationService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
@Tag(name = "Reservation Controller", description = "Rezervasyon işlemleri")
public class ReservationController {
	private final ReservationService reservationService;
	private final LogService logService;
	public ReservationController(ReservationService reservationService,LogService logService) {
        this.reservationService = reservationService;
        this.logService=logService;
    }
	
	// Kullanıcı için rezervasyon oluşturma
    @PostMapping("/api/reservations")
    public ReservationResponseDto reserveBook(@RequestBody ReservationRequestDto reservationRequestDto) {
        return reservationService.reserveBook(reservationRequestDto);
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping("api/myReservations")
    public ResponseEntity<List<ReservationResponseDto>> getUserReservations(HttpServletRequest request) {
        List<ReservationResponseDto> reservations = reservationService.getUserReservations(request);
        return ResponseEntity.ok(reservations);
    }
    
    /*
 // Kullanıcı için rezervasyon bilgisi
    @GetMapping("/api/reservations/user/{reservationId}")
    public ReservationResponseDto getUserReservation(@PathVariable Long reservationId) {
        return reservationService.getUserReservation(reservationId);
    }*/
    
 // Admin için detaylı rezervasyon bilgisi
    @GetMapping("/admin/{reservationId}")
    public ReservationAdminResponseDto getAdminReservation(@PathVariable Long reservationId) {
    	String adminName=SecurityContextHolder.getContext().getAuthentication().getName();
    	logService.saveLog("GET", "Reservation", reservationId, adminName);
        return reservationService.getAdminReservation(reservationId);
    }
 // Admin için tüm rezervasyon bilgisi
    @GetMapping("/admin/reservations/all")
    public List<ReservationAdminResponseDto> getAllReservationsForAdmin(ReservationAdminResponseDto adminResponseDto){
    	String adminName=SecurityContextHolder.getContext().getAuthentication().getName();
    	logService.saveLog("GET", "Reservation", adminResponseDto.getReservationId(), adminName);
    	return reservationService.getAllReservationForAdmin();
    }
    
 // Admin için rezervasyon oluşturma
    @PostMapping("/admin/reservation")
    public ReservationAdminResponseDto createAdminResarvation(@RequestBody ReservationRequestDto reservationRequestDto){
    	String adminName=SecurityContextHolder.getContext().getAuthentication().getName();
    	logService.saveLog("POST", "Reservation", null, adminName);
    	return reservationService.createReservation(reservationRequestDto);
    }
    
 // Admin için rezervasyon güncelleme
    @PutMapping("/admin/{reservationId}")
    public ReservationAdminResponseDto updateReservation(
            @PathVariable Long reservationId,
            @RequestBody ReservationRequestDto reservationRequestDto) {
    	String adminName=SecurityContextHolder.getContext().getAuthentication().getName();
    	logService.saveLog("PUT", "Reservation", reservationId, adminName);
        return reservationService.updateReservation(reservationId, reservationRequestDto);
    }
    
 // Admin için rezervasyon silme
    @DeleteMapping("/admin/{reservationId}")
    public void deleteReservation(@PathVariable Long reservationId) {
    	String adminName=SecurityContextHolder.getContext().getAuthentication().getName();
    	logService.saveLog("DELETE", "Reservation", reservationId, adminName);
        reservationService.deleteReservation(reservationId);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/reservationCount")
    public Map<String, Long> getBorrowedBooksCount() {
        Long count = reservationService.getBorrowedBooksCount();
        return Collections.singletonMap("count", count); // {"count": 320}
    }
    
	
}
